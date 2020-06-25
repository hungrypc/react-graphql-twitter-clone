import { SIGN_IN, ME, NO_TOKEN } from '../actions/types';

const INITIAL_STATE = {
  auth: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, auth: false };
    case ME:
      return {...state, auth: false };
    case NO_TOKEN:
      return {...state, auth: false };
    default:
      return state;
  }
};