import {ChannelType} from "./channel";
import {VtuberInfo} from "./vtuber";

export enum Nation {
    KOREA = 'KOREA',
    JAPAN = 'JAPAN',
    USA = 'USA',
    CHINA = 'CHINA',
    // 필요한 다른 국가들 추가
}

export interface FandomInfo {
    fandomId: number;
    name: string;
}

interface ChannelInfo {
    type: ChannelType;
    url: string;
}

export interface AgencyInfo {
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