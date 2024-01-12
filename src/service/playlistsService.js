const { Pool } = require('pg')

class PlaylistService {
    constructor() {
        this._pool = new Pool()
    }

    async getPlaylists(id) {
        const query = {
            text: 'SELECT p.id AS playlist_id, p.name AS playlist_name, s.id AS song_id, s.title, s.performer FROM playlist_songs ps JOIN playlists p ON ps.playlist_id = p.id JOIN songs s ON ps.song_id = s.id WHERE p.id = $1',
            values: [id]
        }

        const result = await this._pool.query(query)
        const playlistData = result.rows[0]
        const songs = result.rows.map((row) => ({
            id: row.song_id,
            title: row.title,
            performer: row.performer
        }))

        const playlists = {
            playlist: {
                id: playlistData.playlist_id,
                name: playlistData.playlist_name,
                songs
            }
        }

        return playlists
    }
}

module.exports = PlaylistService