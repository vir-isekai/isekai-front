import apiService from './apiService';
import { VtuberEntry, VtuberDetail, CreateVtuberDto } from '../types/vtuber';

const vtuberService = {
    // VTuber 목록 조회
    getVtubers: () => {
        return apiService.get<VtuberEntry[]>('/vtubers');
    },

    // 에이전시별 VTuber 목록 조회
    getVtubersByAgency: (agencyId: number) => {
        return apiService.get<VtuberEntry[]>(`/agencies/${agencyId}/vtubers`);
    },

    // 특정 VTuber 상세 조회
    getVtuber: (id: number) => {
        return apiService.get<VtuberDetail>(`/vtubers/${id}`);
    },

    // VTuber 생성
    createVtuber: (vtuberData: CreateVtuberDto) => {
        return apiService.post<VtuberEntry, CreateVtuberDto>('/vtubers', vtuberData);
    },

    // VTuber 수정
    updateVtuber: (id: number, vtuberData: Partial<CreateVtuberDto>) => {
        return apiService.put<VtuberEntry, Partial<CreateVtuberDto>>(`/vtubers/${id}`, vtuberData);
    },

    // VTuber 삭제
    deleteVtuber: (id: number) => {
        return apiService.delete<void>(`/vtubers/${id}`);
    },

    // 인기 VTuber 목록 조회
    getPopularVtubers: (limit: number = 10) => {
        return apiService.get<VtuberEntry[]>(`/vtubers/popular?limit=${limit}`);
    },

    // 최근 데뷔한 VTuber 목록 조회
    getRecentVtubers: (limit: number = 10) => {
        return apiService.get<VtuberEntry[]>(`/vtubers/recent?limit=${limit}`);
    },

    // 태그로 VTuber 검색
    getVtubersByTag: (tag: string) => {
        return apiService.get<VtuberEntry[]>(`/vtubers/tags/${tag}`);
    },

    // 키워드로 VTuber 검색
    searchVtubers: (keyword: string) => {
        return apiService.get<VtuberEntry[]>(`/vtubers/search?keyword=${encodeURIComponent(keyword)}`);
    }
};

export default vtuberService;