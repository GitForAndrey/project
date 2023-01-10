import { SET_FLAG_ERROR } from '../actions/selectFlagActions';

const initialState = {
  error: false,
  errorMessage: '',
};

const selectFlagReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FLAG_ERROR: {
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    }

    default:
      return state;
  }
};

export default selectFlagReducer;
