const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const {
  mapDBToModelPlaylist,
  mapDBToModelPlaylistActivity,
} = require("../../utils");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const AuthorizationError = require("../../exceptions/AuthorizationError");

class PlaylistsService {
  constructor(collaborationService, cacheService) {
    this._pool = new Pool();
    this._collaborationService = collaborationService;
    this._cacheService = cacheService;
  }

  async addPlaylist({ name, owner }) {
    const id = `playlist-${nanoid(16)}`;

    const query = {
      text: "INSERT INTO playlists VALUES($1, $2, $3) RETURNING id",
      values: [id, name, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Playlist gagal ditambahkan");
    }

    await this._cacheService.delete(`playlists:user:${owner}`);

    return result.rows[0].id;
  }

  async getPlaylists(owner) {
    try {
      const result = await this._cacheService.get(`playlists:user:${owner}`);
      return JSON.parse(result);
    } catch (error) {
      const query = {
        text: `SELECT p.id, p.name, u.username FROM playlists p 
               LEFT JOIN collaborations c ON c.playlist_id = p.id 
               LEFT JOIN users u ON u.id = p.owner 
               WHERE p.owner = $1 OR c.user_id = $1
               GROUP BY p.id, p.name, u.username`,
        values: [owner],
      };

      const result = await this._pool.query(query);

      const mappedPlaylists = result.rows.map(mapDBToModelPlaylist);

      await this._cacheService.set(
        `playlists:user:${owner}`,
        JSON.stringify(mappedPlaylists),
        300
      );

      return mappedPlaylists;
    }
  }

  async deletePlaylistById(id) {
    const ownerQuery = {
      text: "SELECT owner FROM playlists WHERE id = $1",
      values: [id],
    };
    const ownerResult = await this._pool.query(ownerQuery);

    const query = {
      text: "DELETE FROM playlists WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Playlist gagal dihapus. Id tidak ditemukan");
    }

    if (ownerResult.rows.length > 0) {
      await this._cacheService.delete(
        `playlists:user:${ownerResult.rows[0].owner}`
      );
    }
    await this._cacheService.delete(`playlist:${id}:songs`);
  }

  async addSongToPlaylist(playlistId, songId) {
    const id = `playlistsong-${nanoid(16)}`;

    const query = {
      text: "INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id",
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Lagu gagal ditambahkan ke playlist");
    }

    await this._cacheService.delete(`playlist:${playlistId}:songs`);
  }

  async getSongsFromPlaylist(playlistId) {
    try {
      const result = await this._cacheService.get(
        `playlist:${playlistId}:songs`
      );
      return JSON.parse(result);
    } catch (error) {
      const query = {
        text: `SELECT p.id, p.name, u.username FROM playlists p
               LEFT JOIN users u ON u.id = p.owner
               WHERE p.id = $1`,
        values: [playlistId],
      };

      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError("Playlist tidak ditemukan");
      }

      const playlist = result.rows[0];

      const songsQuery = {
        text: `SELECT s.id, s.title, s.performer FROM songs s
               LEFT JOIN playlist_songs ps ON ps.song_id = s.id
               WHERE ps.playlist_id = $1`,
        values: [playlistId],
      };

      const songsResult = await this._pool.query(songsQuery);

      const playlistWithSongs = {
        ...playlist,
        songs: songsResult.rows,
      };

      await this._cacheService.set(
        `playlist:${playlistId}:songs`,
        JSON.stringify(playlistWithSongs),
        600
      );

      return playlistWithSongs;
    }
  }

  async deleteSongFromPlaylist(playlistId, songId) {
    const query = {
      text: "DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id",
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Lagu gagal dihapus dari playlist");
    }

    await this._cacheService.delete(`playlist:${playlistId}:songs`);
  }

  async verifyPlaylistOwner(id, owner) {
    const query = {
      text: "SELECT * FROM playlists WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Playlist tidak ditemukan");
    }

    const playlist = result.rows[0];

    if (playlist.owner !== owner) {
      throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
    }
  }

  async verifyPlaylistAccess(playlistId, userId) {
    try {
      await this.verifyPlaylistOwner(playlistId, userId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      try {
        await this._collaborationService.verifyCollaborator(playlistId, userId);
      } catch {
        throw error;
      }
    }
  }

  async addActivity(playlistId, songId, userId, action) {
    const id = `activity-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: "INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6)",
      values: [id, playlistId, songId, userId, action, time],
    };

    await this._pool.query(query);
  }

  async getPlaylistActivities(playlistId) {
    const query = {
      text: `SELECT u.username, s.title, psa.action, psa.time
             FROM playlist_song_activities psa
             LEFT JOIN users u ON u.id = psa.user_id
             LEFT JOIN songs s ON s.id = psa.song_id
             WHERE psa.playlist_id = $1
             ORDER BY psa.time`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows.map(mapDBToModelPlaylistActivity);
  }
}

module.exports = PlaylistsService;
