import { DiscordService } from './service';
import 'dotenv/config';

const { APU_SHENANIGAN_GUILD_ID = '' } = process.env;

const service = new DiscordService();

export async function getChannels() {
    return await service.getChannels(APU_SHENANIGAN_GUILD_ID);
}
export async function getMessages(channelId: string) {
    return await service.getChannelMessage(channelId, APU_SHENANIGAN_GUILD_ID);
}
export async function getEmoji(emojiId: string) {
    return await service.getEmoji(emojiId, APU_SHENANIGAN_GUILD_ID);
}
