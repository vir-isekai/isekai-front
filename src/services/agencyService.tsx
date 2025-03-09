import apiService from './apiService';
import { AgencyDetail, AgencyInfo, CreateAgencyDto } from '../types/agency';

const agencyService = {
    getAgencies: () => {
        return apiService.get<AgencyInfo[]>('/agencies');
    },

    getAgency: (id: number) => {
        return apiService.get<AgencyDetail>(`/agencies/${id}`);
    },

    createAgency: (agencyData: CreateAgencyDto) => {
        return apiService.post<AgencyDetail, CreateAgencyDto>('/agencies', agencyData);
    },

    updateAgency: (id: number, agencyData: Partial<CreateAgencyDto>) => {
        return apiService.put<AgencyDetail, Partial<CreateAgencyDto>>(`/agencies/${id}`, agencyData);
    },

    deleteAgency: (id: number) => {
        return apiService.delete<void>(`/agencies/${id}`);
    }
};

export default agencyService;