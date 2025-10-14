const mapDBToModelAlbum = ({
  id,
  name,
  year,
  cover_url,
  created_at,
  updated_at,
}) => ({
  id,
  name,
  year,
  coverUrl: cover_url,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapDBToModelSong = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapDBToModelPlaylist = ({ id, name, username }) => ({
  id,
  name,
  username,
});

const mapDBToModelUser = ({ id, username, fullname }) => ({
  id,
  username,
  fullname,
});

const mapDBToModelPlaylistActivity = ({
  username, title, action, time,
}) => ({
  username,
  title,
  action,
  time,
});

const mapDBToModelCollaboration = ({ id, playlist_id, user_id }) => ({
  id,
  playlistId: playlist_id,
  userId: user_id,
});

module.exports = {
  mapDBToModelAlbum,
  mapDBToModelSong,
  mapDBToModelPlaylist,
  mapDBToModelUser,
  mapDBToModelPlaylistActivity,
  mapDBToModelCollaboration,
};
