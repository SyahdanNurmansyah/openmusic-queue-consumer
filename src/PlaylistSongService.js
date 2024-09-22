const { Pool } = require("pg");

class PlaylistSongsService {
    constructor() {

        this._pool = new Pool();
    }

    async getSongsByPlaylistId(playlistId) {
        
        const playlistQuery = {
            text: `SELECT id, name FROM playlists
            WHERE id = $1`,
            values: [playlistId],
        };

        const playlistQueryResult = await this._pool.query(playlistQuery);
        const playlist = playlistQueryResult.rows[0];

        const songsQuery = {
            text: `SELECT songs.id, songs.title, songs.performer FROM songs
            LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id
            WHERE playlist_songs.playlist_id = $1`,
            values: [playlistId],
        }

        const songsQueryResult = await this._pool.query(songsQuery);
        
        const songs = songsQueryResult.rows;
        const response = {
            ...playlist,
            songs,
        };

        return response;
    }
}

module.exports = PlaylistSongsService;