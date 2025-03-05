import apiService from './api';
import { AgencyDetail, AgencyEntry, CreateAgencyDto } from '../types/agency';

const agencyService = {
    getAgencies: () => {
        return apiService.get<AgencyEntry[]>('/agencies');
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