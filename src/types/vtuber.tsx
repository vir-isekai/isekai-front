import {ChannelInfo, ChannelType} from "./channel";
import {FandomInfo, Nation} from "./agency";

export interface VtuberDetail {
    name: string,
    age: number,
    height: number,
    fandom: FandomInfo,
    race: string,
    debutDate: string,
    graduateDate: string,
    channelInfos: ChannelInfo[],
}

export interface VtuberInfo {
    vtuberId: number;
    name: string;
    profileImageUrl: string;
}

// VTuber 목록 조회용 간소화된 타입
export interface VtuberEntry {
    vtuberId: number;
    name: string;
    avatarImageUrl: string;
    debutDate: string;
    agency?: {
        agencyId: number;
        name: string;
    };
}

// VTuber 상세 정보 인터페이스
export interface VtuberDetail2 {
    vtuberId: number;
    name: string;
    avatarImageUrl: string;
    debutDate: string;
    graduationDate?: string;
    description: string;
    nationality: Nation;
    agency?: {
        agencyId: number;
        name: string;
        logoImageUrl: string;
    };
    channelInfos: ChannelInfo[];
    fanName?: string;
    nicknames: string[];
    catchphrase?: string;
    height?: number; // cm
    birthday?: string; // MM-DD 형식
    tags: string[];
}

// VTuber 생성을 위한 DTO
export interface CreateVtuberDto {
    name: string;
    avatarImageUrl: string;
    debutDate: string;
    graduationDate?: string;
    description: string;
    agencyId?: number;
    channels: {
        type: ChannelType;
        url: string;
    }[];
    fanName?: string;
    nicknames: string[];
    catchphrase?: string;
    height?: number;
    birthday?: string;
    tags: string[];
}