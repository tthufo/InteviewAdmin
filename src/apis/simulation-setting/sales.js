import axiosCallApi from '../axiosCallApi';

export const postSales = async (params) => {
  const { id, data, ...rest } = params;
  return axiosCallApi(`/api/v1/simulations/${id}/sales`, 'post', rest);
};


export const updateSales = async (params) => {
  const {
    simulationId, id, data, ...rest
  } = params;
  return axiosCallApi(`/api/v1/simulations/${simulationId}/sales/${id}`, 'put', rest);
};

export const getSales = async (params) => {
  const {
    id,
  } = params;
  return axiosCallApi(`/api/v1/simulations/${id}/sales`, 'get');
};


export default {
  postSales,
  updateSales,
  getSales,
};
