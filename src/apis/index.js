import axios from 'axios';
import auth from './auth';
import account from './account';
import companySetting from './companySetting';
import pastData from './simulation-setting/past-data';
import assets from './simulation-setting/assets';
import finance from './simulation-setting/finance';
import basicInfo from './simulation-setting/basic-info';
import sale from './simulation-setting/sales';
import salary from './simulation-setting/human-resources';
import rent from './simulation-setting/rent-of-office';
import otherExpense from './simulation-setting/other_expenses';
import viewSimulation from './viewSimulation/projected-FS-by-table';
import accountAdmin from './admin/account';
import category from './category';
import question from './question';

const API = {
  accountAdmin,
  auth,
  account,
  companySetting,
  pastData,
  assets,
  finance,
  basicInfo,
  sale,
  salary,
  rent,
  otherExpense,
  viewSimulation,
  category,
  question,
};

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST;

export default API;
