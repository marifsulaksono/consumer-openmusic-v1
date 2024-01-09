const { Pool } = require('pg')

class PlaylistService {
    constructor() {
        this._pool = new Pool()
    }

    async getPlaylists(owner) {
        const playlist = await this._pool.query('SELECT id FROM playlists WHERE owner = $1', [owner])
        const playlistId = playlist.rows[0].id
        console.log(playlistId)
        console.log(owner)

        const query = {
            text: 'SELECT p.id AS playlist_id, p.name AS playlist_name, s.id AS song_id, s.title, s.performer FROM playlist_songs ps JOIN playlists p ON ps.playlist_id = p.id JOIN songs s ON ps.song_id = s.id WHERE p.id = $1',
            values: [playlistId]
        }

        const result = await this._pool.query(query)
        const playlistData = result.rows[0]
        console.log(playlistData.playlist_id, playlistData.playlist_name)
        const songs = result.rows.map((row) => ({
            id: row.song_id,
            title: row.title,
            performer: row.performer
        }))

        const playlists = {
            id: playlistData.playlist_id,
            name: playlistData.playlist_name,
            songs
        }

        console.log(playlists)
        return playlists
    }
}

module.exports = PlaylistService