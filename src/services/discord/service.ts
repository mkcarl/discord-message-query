import * as discord from 'discord.js';
import { GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { Discord } from '../../types/discord';

const { DISCORD_BOT_TOKEN } = process.env;

class DiscordService {
    client;

    constructor() {
        this.client = new discord.Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildMessages,
            ],
        });
        this.client.login(DISCORD_BOT_TOKEN);
        this.client.once('ready', () => {
            console.info(`Bot is online!`);
        });
    }

    listeners() {}

    async getChannels(id: string) {
        const guild = await this.client.guilds.fetch(id);
        return guild.channels.fetch();
    }

    async getChannelMessage(
        channelId: string,
        guildId: string
    ): Promise<Discord.CleanedMessage[]> {
        const guild = await this.client.guilds.fetch(guildId);
        const channel = (await guild.channels.fetch(
            channelId
        )) as discord.TextChannel;
        const allMsg: discord.Message[] = [];
        const final: Discord.CleanedMessage[] = [];
        if (
            ![
                discord.ChannelType.GuildText,
                discord.ChannelType.GuildPrivateThread,
                discord.ChannelType.GuildPublicThread,
                discord.ChannelType.GuildForum,
                discord.ChannelType.GuildNewsThread,
                discord.ChannelType.GuildNews,
            ].includes(channel!.type)
        )
            return final;
        let message: discord.Collection<string, discord.Message>;
        let hasMoreMessages = true;
        while (hasMoreMessages) {
            message = await channel.messages.fetch({
                limit: 100,
                before: allMsg[allMsg.length - 1]?.id,
            });
            message.forEach((msg) => allMsg.push(msg));

            if (message.size !== 100) {
                hasMoreMessages = false;
            }
            // if (allMsg.length > 1000) break;
        }

        for (const msg of allMsg) {
            final.push({
                channelId: msg.channelId,
                id: msg.id,
                applicationId: msg.applicationId,
                content: msg.content,
                authorId: msg.author.id,
                createdTimestamp: msg.createdTimestamp,
                editedTimestamp: msg.editedTimestamp,
                pinned: msg.pinned,
            });
        }

        return final;
    }
}

export { DiscordService };
