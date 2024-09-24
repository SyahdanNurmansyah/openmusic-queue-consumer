class Listener {
    constructor(playlistsService, mailSender) {

        this._playlistsService = playlistsService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {

        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());
            const playlist = await this._playlistsService.getSongsByPlaylistId(playlistId);

            console.log(playlist);

            const prettyJson = JSON.stringify(playlist, null, 2);
 
            const result = await this._mailSender.sendEmail(targetEmail, prettyJson);

            // const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify({ playlist }));

            console.log('Email terkirim:', result);

        }   catch (error) {
            console.error(error);
        };
    };
};

module.exports = Listener;

            // const playlistSongs = {
            //     playlist: {
            //         ...playlist,
            //     }
            // }
            // const prettyJson = JSON.stringify(playlist, null, 2);
 
            // const result = await this._mailSender.sendEmail(targetEmail, prettyJson);
            