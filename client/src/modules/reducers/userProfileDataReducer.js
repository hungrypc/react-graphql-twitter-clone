import { GET_PROFILE_DATA } from '../actions/types';

const INITIAL_STATE = {
  data: {
    name: ''
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROFILE_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};