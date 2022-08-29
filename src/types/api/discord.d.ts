import * as API from './index';
import { Discord } from '../discord';
import * as discord from 'discord.js';

export namespace Message {
    type Query = {
        channelId: string;
    };
    type Request = API.Request<undefined, undefined, undefined, Query>;
    type Response = API.Response<{
        message: string;
        data: Discord.CleanedMessage[];
    }>;
}
export namespace Emoji {
    type Query = {
        emojiId: string;
    };
    type Request = API.Request<undefined, undefined, undefined, Query>;
    type Response = API.Response<{
        message: string;
        data: discord.GuildEmoji | undefined;
    }>;
}
