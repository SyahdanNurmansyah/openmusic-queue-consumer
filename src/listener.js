class Listener {
    constructor(playlistSongsService, mailSender) {

        this._playlistSongsService = playlistSongsService;
        this._mailSender = mailSender;
    }

    async listen(message) {

        try {

            const { playlistId, targetEmail } = JSON.parse(message.content.toString());

            const playlistSongs = await this._playlistSongsService.getSongsByPlaylistId(playlistId);
            const prettyJson = JSON.stringify(playlistSongs, null, 2);

            const result = await this._mailSender.sendEmail(targetEmail, prettyJson);

            console.log('Email terkirim!', result);

        }   catch (error) {
            console.error(error);
        }
    }
}

module.exports = Listener;