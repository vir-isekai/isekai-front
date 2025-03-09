import apiService from './apiService';
import {HomeResponse} from '../types/home';

const homeService = {
    getHomeResponse: () => {
        return apiService.get<HomeResponse>('home')
    }
}

export default homeService;