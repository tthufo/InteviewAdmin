import axiosCallApi from '../axiosCallApiAdmin';

const dropdownList = async params => axiosCallApi('/api/admin_jwt/dropdown-list', 'get', params);
const taxRates = async params => axiosCallApi('/api/admin_jwt/tax-rates', 'get', params);
const set = async (id, params) => axiosCallApi(`/api/admin_jwt/users/${id}/companies`, 'post', params);
const get = async id => axiosCallApi(`/api/admin_jwt/users/${id}/companies`);

export default {
  dropdownList,
  taxRates,
  get,
  set,
};
