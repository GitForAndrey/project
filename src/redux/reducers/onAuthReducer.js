import {
  INIT_DB,
  SET_AUTH_DATA,
  SET_AUTH_ERROR,
  STATUS_DB,
} from '../actions/onAuthActions';

const initialState = {
  authToken: '',
  isSuccess: false,
  statusDb: false,
  initDb: false,
  error: false,
  errorMessage: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA: {
      return {
        ...state,
        authToken: action.payload,
        isSuccess: true,
        error: false,
      };
    }
    case INIT_DB: {
      return {
        ...state,
        initDb: true,
        error: false,
        errorMessage: '',
      };
    }
    case STATUS_DB: {
      return {
        ...state,
        statusDb: true,
      };
    }
    case SET_AUTH_ERROR: {
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    }
    case 'TO_APP': {
      return {
        ...state,
        isSuccess: true,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
