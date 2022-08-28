import * as API from './index';
import { Discord } from '../discord';

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
