import axiosCallApi from '../axiosCallApiAdmin';

const getMyProfile = async params => axiosCallApi('/api/admin_jwt/me', 'get', params);
const updateAccount = async params => axiosCallApi('/api/admin_jwt/me', 'post', params);

export default {
  getMyProfile,
  updateAccount,
};
