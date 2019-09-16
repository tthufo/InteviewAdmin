import axiosCallApi from '../axiosCallApi';

export const postHumanResources = async params => axiosCallApi(`/api/v1/simulations/${params.id}/salaries`, 'post', params);

export const getHumanResources = async params => axiosCallApi(`/api/v1/simulations/${params.id}/salaries`, 'get');


export default {
  postHumanResources,
  getHumanResources,
};
