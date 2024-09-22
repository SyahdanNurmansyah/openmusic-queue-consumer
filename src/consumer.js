require('dotenv').config();

const amqp = require('amqplib');
const PlaylistSongsService = require('./PlaylistSongService');
const MailSender = require('./MailSender');
const Listerner = require('./liserner');

const init = async () => {
    const playlistSongsService = new PlaylistSongsService();
    const mailSender = new MailSender();
    const listerner = new Listerner(playlistSongsService, mailSender);

    const connection = await amqp.connect(process.env.RABBIT_SERVER);
    const channel = await connection.createChannel();

    await channel.assertQueue('export:songs', {
        durable: true,
    });

    channel.consume('export:songs', listerner.listen,{ noAck: true})
};

init();