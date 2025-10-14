# Data Mapper Guide

## Overview

Data mapper berfungsi untuk mengonversi data dari format database (snake_case) ke format yang sesuai dengan response API (camelCase). Ini membantu konsistensi format data di seluruh aplikasi.

## Mapper yang Tersedia

### 1. mapDBToModelAlbum

Mengkonversi data album dari database ke format API response.

**Input (Database format):**

```javascript
{
  id: "album-123",
  name: "Album Name",
  year: 2023,
  cover_url: "http://example.com/cover.jpg",
  created_at: "2023-01-01T00:00:00.000Z",
  updated_at: "2023-01-01T00:00:00.000Z"
}
```

**Output (API format):**

```javascript
{
  id: "album-123",
  name: "Album Name",
  year: 2023,
  coverUrl: "http://example.com/cover.jpg",
  createdAt: "2023-01-01T00:00:00.000Z",
  updatedAt: "2023-01-01T00:00:00.000Z"
}
```

### 2. mapDBToModelSong

Mengkonversi data song dari database ke format API response.

**Input (Database format):**

```javascript
{
  id: "song-123",
  title: "Song Title",
  year: 2023,
  genre: "Pop",
  performer: "Artist Name",
  duration: 180,
  album_id: "album-123",
  created_at: "2023-01-01T00:00:00.000Z",
  updated_at: "2023-01-01T00:00:00.000Z"
}
```

**Output (API format):**

```javascript
{
  id: "song-123",
  title: "Song Title",
  year: 2023,
  genre: "Pop",
  performer: "Artist Name",
  duration: 180,
  albumId: "album-123",
  createdAt: "2023-01-01T00:00:00.000Z",
  updatedAt: "2023-01-01T00:00:00.000Z"
}
```

### 3. mapDBToModelPlaylist

Mengkonversi data playlist dari database ke format API response.

**Input (Database format):**

```javascript
{
  id: "playlist-123",
  name: "My Playlist",
  username: "john_doe"
}
```

**Output (API format):**

```javascript
{
  id: "playlist-123",
  name: "My Playlist",
  username: "john_doe"
}
```

### 4. mapDBToModelUser

Mengkonversi data user dari database ke format API response.

**Input (Database format):**

```javascript
{
  id: "user-123",
  username: "john_doe",
  fullname: "John Doe"
}
```

**Output (API format):**

```javascript
{
  id: "user-123",
  username: "john_doe",
  fullname: "John Doe"
}
```

### 5. mapDBToModelPlaylistActivity

Mengkonversi data aktivitas playlist dari database ke format API response.

**Input (Database format):**

```javascript
{
  username: "john_doe",
  title: "Song Title",
  action: "add",
  time: "2023-01-01T00:00:00.000Z"
}
```

**Output (API format):**

```javascript
{
  username: "john_doe",
  title: "Song Title",
  action: "add",
  time: "2023-01-01T00:00:00.000Z"
}
```

### 6. mapDBToModelCollaboration

Mengkonversi data kolaborasi dari database ke format API response.

**Input (Database format):**

```javascript
{
  id: "collab-123",
  playlist_id: "playlist-123",
  user_id: "user-123"
}
```

**Output (API format):**

```javascript
{
  id: "collab-123",
  playlistId: "playlist-123",
  userId: "user-123"
}
```

## Cara Penggunaan

### Import Mapper

```javascript
const {
  mapDBToModelAlbum,
  mapDBToModelSong,
  mapDBToModelPlaylist,
  mapDBToModelUser,
  mapDBToModelPlaylistActivity,
  mapDBToModelCollaboration,
} = require("../../utils");
```

### Penggunaan Tunggal

```javascript
// Untuk single record
const song = result.rows.map(mapDBToModelSong)[0];

// Atau
const song = mapDBToModelSong(result.rows[0]);
```

### Penggunaan Array

```javascript
// Untuk multiple records
const songs = result.rows.map(mapDBToModelSong);
const playlists = result.rows.map(mapDBToModelPlaylist);
const users = result.rows.map(mapDBToModelUser);
```

## Manfaat Menggunakan Mapper

1. **Konsistensi Format**: Semua response API menggunakan format camelCase
2. **Maintainability**: Mudah mengubah format data tanpa mengubah banyak kode
3. **Separation of Concerns**: Memisahkan logika formatting dari logika bisnis
4. **Type Safety**: Membantu dalam validasi struktur data
5. **Reusability**: Mapper dapat digunakan kembali di berbagai service

## Service yang Menggunakan Mapper

- **AlbumsService**: menggunakan `mapDBToModelAlbum` dan `mapDBToModelSong`
- **SongsService**: menggunakan `mapDBToModelSong`
- **PlaylistsService**: menggunakan `mapDBToModelPlaylist` dan `mapDBToModelPlaylistActivity`
- **UsersService**: menggunakan `mapDBToModelUser`

## Cache Integration

Mapper terintegrasi dengan cache system. Data yang sudah di-map akan disimpan dalam cache dalam format yang sudah benar, sehingga tidak perlu mapping ulang saat mengambil dari cache.

```javascript
// Contoh penggunaan dengan cache
const mappedSongs = result.rows.map(mapDBToModelSong);
await this._cacheService.set(cacheKey, JSON.stringify(mappedSongs), 600);
```
