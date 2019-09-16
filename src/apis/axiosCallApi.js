import axios from 'axios';

async function axiosCallApi(url, method = 'get', params) {
  const axiosSetup = {
    url,
    method,
    timeout: 10000,
  };
  if (localStorage.getItem('userInfo_user') !== null) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo_user'));
    axiosSetup.headers = { Authorization: `Bearer ${(userInfo && userInfo.accessToken) || ''}` };
  }
  if (method === 'get') {
    axiosSetup.params = params;
  } else {
    axiosSetup.data = params;
  }
  try {
    const result = await axios(axiosSetup);
    return result;
  } catch (error) {
    if (error.response.status === 401) {
      if (error && error.response && error.response.data.detail && error.response.data.detail === 'Not signed in') {
        localStorage.removeItem('userInfo_user');
        window.location.reload();
      }
    }
    throw error;
  }
}
export default axiosCallApi;
