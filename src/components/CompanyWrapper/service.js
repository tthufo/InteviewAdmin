
let changeListeners = [];
const user = null;
let company = null;

const getCompany = () => company;

const setCompany = (newCompany) => {
  company = newCompany;
  changeListeners.forEach(l => l(user));
};

const saveCompany = () => {
  localStorage.setItem('company', JSON.stringify(company));
};

const loadCompany = () => {
  const companyInfo = JSON.parse(localStorage.getItem('company'));
  setCompany(companyInfo);
};

const addListener = (object) => {
  if (changeListeners.every(item => item !== object)) {
    changeListeners.push(object);
  }
};

const removeListener = (object) => {
  changeListeners = changeListeners.filter(item => item !== object);
};


const userInfo = {
  addListener,
  removeListener,
  getCompany,
  saveCompany,
  loadCompany,
  setCompany,
};

export default userInfo;
