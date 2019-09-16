import axiosCallApi from './axiosCallApi';

const getQuestion = async params => axiosCallApi('/question/getQuestion', 'get', params);
const postQuestion = async params => axiosCallApi('/question/postQuestion', 'post', params);
const editQuestion = async params => axiosCallApi('/question/editQuestion', 'post', params);
const delQuestion = async params => axiosCallApi('/question/delQuestion', 'post', params);


const getAnswer = async params => axiosCallApi('/answer/getAnswer', 'get', params);

const getListConfig = async params => axiosCallApi('/list/getListConfig', 'get', params);
const getList = async params => axiosCallApi('/list/getList', 'get', params);
const postList = async params => axiosCallApi('/list/postList', 'post', params);


export default {
  getQuestion,
  postQuestion,
  editQuestion,
  delQuestion,
  getAnswer,
  getListConfig,
  getList,
  postList,
};
