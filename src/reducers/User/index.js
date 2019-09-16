import { fromJS } from 'immutable';

const initialState = fromJS({
  user: null,
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return state.set('user', fromJS(action.value));
    case 'LOG_OUT':
      return state.set('user', initialState);
    default:
      return state;
  }
}

export default userReducer;
