import {VtuberInfo} from "./vtuber";
import {AgencyInfo} from "./agency";

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