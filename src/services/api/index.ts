import express from 'express';
import { getChannels, getEmoji, getMessages } from '../discord';
import winston from 'winston';
import { Emoji, Message } from '../../types/api/discord';

const PORT = 3000;
const app = express();
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    defaultMeta: { service: 'API' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
    ],
});

app.listen(PORT, () => {
    logger.info(`API listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send(
        `
        <html>
            <h1>Discord bot</h1>        
        </html>
        `
    );
});

app.head('/keepAlive', (req, res) => {
    logger.debug('PING');
    res.send('pong');
    logger.debug('PONG');
});

app.get('/channels', async (req, res) => {
    logger.debug('Fetching all channels');
    const channels = await getChannels();
    logger.debug('Done fetching channels');

    try {
        logger.info('Sending channel list');
        res.send(channels);
    } catch (e) {
        logger.error(e);
    }
});

app.get('/messages', async (req: Message.Request, res: Message.Response) => {
    const channelId = req.query.channelId;
    if (!channelId) {
        logger.error(`Invalid channel id.`);
        res.send({
            data: [],
            message: 'Invalid channel id',
        });
        return;
    }
    try {
        logger.debug('Fetching messages');
        const msg = await getMessages(channelId);
        logger.debug('Done fetching messages');
        logger.info('Sending channel messages');
        res.send({
            message: `OK`,
            data: msg,
        });
    } catch (e) {
        logger.error('Error fetching message');
        res.send({
            data: [],
            message: 'Error fetching messages',
        });
    }
});

app.get('/emoji', async (req: Emoji.Request, res: Emoji.Response) => {
    const emojiId = req.query.emojiId;
    try {
        logger.debug('Fetching emoji');
        const emoji = await getEmoji(emojiId);
        logger.debug('Done fetching emoji');
        if (!emoji) throw Error;
        logger.info('Sending emoji');
        res.send({ message: 'OK', data: emoji });
    } catch (e) {
        logger.error(e);
        res.send({ data: undefined, message: 'Emoji not found' });
    }
});

export default app;
