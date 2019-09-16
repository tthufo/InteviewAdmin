import axiosCallApi from '../axiosCallApi';

export const postRentOffice = async params => axiosCallApi(`/api/v1/simulations/${params.id}/rent-office`, 'post', params);

export const getRentOffice = async params => axiosCallApi(`/api/v1/simulations/${params.id}/rent-office`, 'get');

export default {
  postRentOffice,
  getRentOffice,
};
