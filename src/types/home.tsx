export interface HomeResponse {
    countInfo: CountInfo;
    popularVtuberInfos: PopularVtuberInfo[];
}

export interface CountInfo {
    agency: number;
    vtuber: number;
    member: number;
    visitor: number;
}

export interface PopularVtuberInfo {
    vtuberInfo: VtuberInfo;
    agencyInfo: AgencyInfo;
}

export interface VtuberInfo {
    id: number;
    name: string;
    profileImageUrl: string;
}

export interface AgencyInfo {
    id: number;
    name: string;
}