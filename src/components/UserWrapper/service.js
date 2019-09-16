import API from '../../apis';

let changeListeners = [];
let user = null;

let keyType = null;

const getUser = () => user;

const setId = async () => {
  try {
    const result = await API.account.getMyProfile();
    const data = result && result.data;
    if (data) {
      localStorage.setItem('id', data.id);
    }
  } catch (error) {
    alert(error);
  }
};

const getID = () => localStorage.getItem('id');

const setUser = (user1, keyType1) => {
  user = user1;
  keyType = keyType1;
  
  if (user !== null) {
    localStorage.setItem(keyType1 !== 'user' ? 'userInfo_admin' : 'userInfo_user', JSON.stringify(user));
  } else {
    localStorage.removeItem(keyType1 !== 'user' ? 'userInfo_admin' : 'userInfo_user');
  }

  changeListeners.forEach(l => l(user));
  if (user1 === null) {
    localStorage.removeItem(keyType1);
  }
};

const addListener = (object) => {
  if (changeListeners.every(item => item !== object)) {
    changeListeners.push(object);
  }
};

const removeListener = (object) => {
  changeListeners = changeListeners.filter(item => item !== object);
};

const isAdmin = () => keyType === 'admin';
const setAdmin = (admin) => { keyType = admin; };

const saveUser = () => {
  localStorage.setItem(isAdmin ? 'userInfo_admin' : 'userInfo_user', JSON.stringify(user));
};

const loadUser = () => {
  const userInfo = JSON.parse(localStorage.getItem(isAdmin ? 'userInfo_admin' : 'userInfo_user'));
  setUser(userInfo, keyType);
};


const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const load = (key) => {
  const userInfo = JSON.parse(localStorage.getItem(key));
  return userInfo;
};

const remove = (key) => {
  localStorage.removeItem(key);
};

const userInfo = {
  getUser,
  setUser,
  addListener,
  removeListener,
  saveUser,
  loadUser,
  setId,
  getID,
  isAdmin,
  setAdmin,
  save,
  load,
  remove,
};

export default userInfo;
