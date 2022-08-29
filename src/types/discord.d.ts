import * as discord from 'discord.js';

export namespace Discord {
    type CleanedMessage = {
        author: discord.User;
        attachment: discord.Attachment[];
        content: string;
        createdTimestamp: number;
        editedTimestamp: number | null;
        id: string;
        pinned: boolean;
    };
}
