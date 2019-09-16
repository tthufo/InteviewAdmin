import axiosCallApi from '../axiosCallApi';

const PL = async id => axiosCallApi(`/api/v1/simulations/${id}/reports/pl`, 'get');
const BS = async id => axiosCallApi(`/api/v1/simulations/${id}/reports/bs`, 'get');
const CF = async id => axiosCallApi(`/api/v1/simulations/${id}/reports/cf`, 'get');
const getKeyIndicator = async id => axiosCallApi(`/api/v1/simulations/${id}/reports/key-indicator`, 'get');
const getprerequisites = async id => axiosCallApi(`/api/v1/simulations/${id}/reports/prerequisites`, 'get');

const getAssumptionList = async id => axiosCallApi(`/api/v1/simulations/${id}/reports/assumption-list`, 'get');

export default {
  PL,
  BS,
  CF,
  getKeyIndicator,
  getprerequisites,
  getAssumptionList,
};
