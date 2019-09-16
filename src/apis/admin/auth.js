import axiosCallApi from '../axiosCallApiAdmin';

const login = async params => axiosCallApi('/api/admin_jwt/sign-in', 'post', params);
const getMyProfile = async params => axiosCallApi('/api/admin_jwt/me', 'get', params);

export default {
  login,
  getMyProfile,
};
