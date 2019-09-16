import axiosCallApi from './axiosCallApi';

const getCategory = async params => axiosCallApi('/category/getCategory', 'get', params);
const postCategory = async params => axiosCallApi('/category/postCategory', 'post', params);
const editCategory = async params => axiosCallApi('/category/editCategory', 'post', params);
const delCategory = async params => axiosCallApi('/category/delCategory', 'post', params);

export default {
  getCategory,
  postCategory,
  editCategory,
  delCategory,
};
