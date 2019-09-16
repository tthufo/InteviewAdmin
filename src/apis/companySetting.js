import axiosCallApi from './axiosCallApi';

const dropdownList = async params => axiosCallApi('/api/v1/dropdown-list', 'get', params);
const taxRates = async params => axiosCallApi('/api/v1/tax-rates', 'get', params);
const add = async params => axiosCallApi('/api/v1/company', 'post', params);
const edit = async params => axiosCallApi('/api/v1/company/1', 'post', params);
const get = async id => axiosCallApi(`/api/v1/company/${id}`, 'get');

export default {
  dropdownList,
  taxRates,
  add,
  get,
  edit,
};
