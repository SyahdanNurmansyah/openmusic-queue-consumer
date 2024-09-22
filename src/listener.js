class Listener {
    constructor(playlistSongsService, mailSender) {

        this._playlistSongsService = playlistSongsService;
        this._mailSender = mailSender;
    }

    async listen(message) {

        try {

            const { playlistId, targetEmail } = JSON.parse(message.content.toString());

            const songs = await this._playlistSongsService.getSongsByPlaylistId(playlistId);
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(songs));

            console.log(result);

        }   catch (error) {
            console.error(error);
        }
    }
}

module.exports = Listener;