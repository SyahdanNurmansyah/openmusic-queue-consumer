class Listerner {
    constructor(playlistSongsServie, mailSender) {

        this._playlistSongsServive = playlistSongsServie;
        this._mailSender = mailSender;
    }

    async listen(message) {

        try {

            const { playlistId, targetEmail } = JSON.parse(message.content.toString());

            const songs = await this._playlistSongsServive.getSongsByPlaylistId(playlistId);
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(songs));

            console.log(result);

        }   catch (error) {
            console.error(error);
        }
    }
}

module.exports = Listerner;