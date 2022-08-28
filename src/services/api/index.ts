import express from 'express';
import { getChannels, getMessages } from '../discord';
import winston from 'winston';
import { Message } from '../../types/api/discord';

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

app.get('/keepAlive', (req, res) => {
    res.send('pong');
});

app.get('/channels', async (req, res) => {
    const channels = await getChannels();

    try {
        res.send(channels);
        logger.info('Sending channel list');
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
        const msg = await getMessages(channelId);
        logger.debug('Sending channel messages');
        res.send({
            message: `OK`,
            data: msg,
        });
    } catch (e) {
        logger.error(e);
        res.send({
            data: [],
            message: ''
        });
    }
});

export default app;
