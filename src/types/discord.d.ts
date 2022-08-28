export namespace Discord {
    type CleanedMessage = {
        applicationId: string | null;
        authorId: string;
        channelId: string;
        content: string;
        createdTimestamp: number;
        editedTimestamp: number | null;
        id: string;
        pinned: boolean;
    };
}
