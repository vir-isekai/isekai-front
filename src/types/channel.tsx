export enum ChannelType {
    YOUTUBE = 'YOUTUBE',
    TWITCH = 'TWITCH',
    TWITTER = 'TWITTER',
    INSTAGRAM = 'INSTAGRAM',
    DISCORD = 'DISCORD',
    // 필요한 다른 채널 타입 추가
}

export interface ChannelInfo {
    type: ChannelType;
    url: string;
}