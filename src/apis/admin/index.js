import axios from 'axios';
import account from './account';
import auth from './auth';
import managerment from './managerment';
import company from './company';
import user from './user';

const API = {
  account,
  auth,
  managerment,
  company,
  user,
};

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST;

export default API;
