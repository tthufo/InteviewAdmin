import { fromJS } from 'immutable';

const initialState = fromJS({
  company: {},
  simulation: {},
});

function companyInfo(state = initialState, action) {
  switch (action.type) {
    case 'SET_COMPANY_INFO':
      return state.set('company', fromJS(action.value));
    case 'SET_SIMULATION':
      if (action.value) {
        return state.set('simulation', fromJS(action.value));
      }
      return state;
    case 'DELETE_SIMULATION':
      return state.set('simulation', fromJS({}));
    case 'DELETE_COMPANY':
      return state.set('company', fromJS({}));
    default:
      return state;
  }
}

export default companyInfo;
