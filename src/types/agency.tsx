export enum Nation {
    KOREA = 'KOREA',
    JAPAN = 'JAPAN',
    USA = 'USA',
    CHINA = 'CHINA',
    // 필요한 다른 국가들 추가
}

export enum ChannelType {
    YOUTUBE = 'YOUTUBE',
    TWITCH = 'TWITCH',
    TWITTER = 'TWITTER',
    INSTAGRAM = 'INSTAGRAM',
    DISCORD = 'DISCORD',
    // 필요한 다른 채널 타입 추가
}

// Spring 코드에서 제공된 타입에 따른 인터페이스 정의
export interface VtuberInfo {
    vtuberId: number;
    name: string;
}

export interface FandomInfo {
    fandomId: number;
    name: string;
}

export interface ChannelInfo {
    type: ChannelType;
    url: string;
}

export interface AgencyEntry {
    agencyId: number;
    name: string;
    logoImageUrl: string;
}

// Agency 상세 정보 인터페이스
export interface AgencyDetail {
    agencyId: number;
    name: string;
    logoImageUrl: string;
    nation: Nation;
    establishedDate: string; // ISO 문자열 형태로 처리
    closedDate?: string; // 선택적 필드
    vtuberInfos: VtuberInfo[];
    fandomInfo?: FandomInfo; // 선택적 필드
    channelInfos: ChannelInfo[];
}

// Agency 생성을 위한 DTO
export interface CreateAgencyDto {
    name: string;
    logoImageUrl: string;
    nation: Nation;
    establishedDate: string; // ISO 문자열 형태로 처리
    closedDate?: string; // 선택적 필드
    vtuberIds?: number[]; // 연결할 VTuber ID 목록
    fandomId?: number; // 선택적 팬덤 ID
    channels: {
        type: ChannelType;
        url: string;
    }[];
}