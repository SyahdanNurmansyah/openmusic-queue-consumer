const { Pool } = require("pg");

class PlaylistsService {
    constructor() {

        this._pool = new Pool();
    }

    async getSongsByPlaylistId(playlistId) {
        
        const playlistQuery = {
            text: `SELECT id, name FROM playlists WHERE id = $1`,
            values: [playlistId],
        };

        const songsQuery = {
            text: `SELECT songs.id, songs.title, songs.performer FROM songs
            LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id
            WHERE playlist_songs.playlist_id = $1`,
            values: [playlistId],
        }

        const playlistQueryResult = await this._pool.query(playlistQuery)
        const songsQueryResult = await this._pool.query(songsQuery);

        return {
            playlist: {
                ...playlistQueryResult.rows[0],
                songs: songsQueryResult.rows,
            }
        }
    }
}

module.exports = PlaylistsService;


        // const result = await this._pool.query(playlistQuery);
        // return result.rows[0];

        // const result = await this._pool.query(playlistQuery);
        // const playlist = result.rows[0];

        // const songs = songsQueryResult.rows;
        
        // const response = {
        //         ...playlist,
        //         songs,
        // };
        // // console.log(JSON.stringify(result));
        // return response;