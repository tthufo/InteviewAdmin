import axiosCallApi from './axiosCallApi';

const getMyProfile = async params => axiosCallApi('/category/getCategory', 'get', params);
const updateAccount = async params => axiosCallApi('/category/postCategory', 'post', params);

export default {
  getMyProfile,
  updateAccount,
};
