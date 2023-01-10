import {
  SET_ACTIVE_FILTER,
  SET_FILTER_VALUE,
  SET_FILTER_VALUE_ERROR,
} from '../actions/scheduleFilterActions';

const initialState = {
  filterValue: [],
  activeFilter: [],
  isReady: false,
  error: false,
  errorMessage: '',
};

const scheduleFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_VALUE: {
      return {
        ...state,
        filterValue: [...action.payload],
        isReady: true,
      };
    }
    case SET_ACTIVE_FILTER: {
      return {
        ...state,
        activeFilter: action.payload,
      };
    }
    case SET_FILTER_VALUE_ERROR: {
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

export default scheduleFilterReducer;
