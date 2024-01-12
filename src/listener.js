class Listener {
    constructor(playlistService, mailSender) {
        this._playlistService = playlistService
        this._mailSender = mailSender

        this.listen = this.listen.bind(this)
    }

    async listen(message) {
        try {
            const { id, targetEmail } = JSON.parse(message.content.toString())

            const playlists = await this._playlistService.getPlaylists(id)
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlists))
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Listener