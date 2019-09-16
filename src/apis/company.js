import axiosCallApi from './axiosCallApi';

export const getCompany = async () => axiosCallApi('/api/v1/company/1', 'get');
