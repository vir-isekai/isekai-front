import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CommonResponse } from '../types/common';

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// API 요청 함수들
export const apiService = {
    // GET 요청
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<CommonResponse<T>> = await apiClient.get(url, config);

            // 응답에서 실제 데이터 추출
            if (response.data && response.data.response !== null) {
                return response.data.response;
            }

            throw new Error('응답 데이터가 없습니다.');
        } catch (error) {
            console.error('API GET Error:', error);
            throw error;
        }
    },

    // POST 요청
    async post<T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<CommonResponse<T>> = await apiClient.post(url, data, config);

            // 응답에서 실제 데이터 추출
            if (response.data && response.data.response !== null) {
                return response.data.response;
            }

            throw new Error('응답 데이터가 없습니다.');
        } catch (error) {
            console.error('API POST Error:', error);
            throw error;
        }
    },

    // PUT 요청
    async put<T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<CommonResponse<T>> = await apiClient.put(url, data, config);

            // 응답에서 실제 데이터 추출
            if (response.data && response.data.response !== null) {
                return response.data.response;
            }

            throw new Error('응답 데이터가 없습니다.');
        } catch (error) {
            console.error('API PUT Error:', error);
            throw error;
        }
    },

    // DELETE 요청
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<CommonResponse<T>> = await apiClient.delete(url, config);

            // 응답에서 실제 데이터 추출
            if (response.data && response.data.response !== null) {
                return response.data.response;
            }

            throw new Error('응답 데이터가 없습니다.');
        } catch (error) {
            console.error('API DELETE Error:', error);
            throw error;
        }
    }
};

// 인터셉터 설정 (JWT 토큰 등을 위한)
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiService;