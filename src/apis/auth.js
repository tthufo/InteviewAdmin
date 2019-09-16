import axiosCallApi from './axiosCallApi';

const login = async params => axiosCallApi('/api/v1/signin', 'post', params);
const signUp = async params => axiosCallApi('/api/v1/signup', 'post', params);

export default {
  login,
  signUp,
};
