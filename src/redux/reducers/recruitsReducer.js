import {
  SET_RECRUITS_DATA,
  SET_RECRUITS_ERROR,
  SET_RECRUITS_PAGE,
  SET_RECRUITS_STATUS,
  TOGGLE_TAGS_RECRUITS,
} from '../actions/recruitsAction';

const initialState = {
  data: [],
  athleteTags: [],
  status: '',
  recruitsPage: 0,
  error: false,
  errorMessage: '',
};

const recruitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECRUITS_DATA: {
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        athleteTags: [...state.athleteTags, ...action.payload.tagsData],
        status: action.payload.status,
        error: false,
      };
    }
    case TOGGLE_TAGS_RECRUITS: {
      const { athleteId, item } = action.payload;
      let result = state.athleteTags.find(
        i => i.athlete_id === athleteId && i.id === item.id,
      );
      if (result) {
        return {
          ...state,
          athleteTags: state.athleteTags.filter(
            i => !(i.athlete_id == result.athlete_id && i.id == result.id),
          ),
        };
      } else {
        return {
          ...state,
          athleteTags: [
            ...state.athleteTags,
            { ...item, athlete_id: athleteId },
          ],
        };
      }
    }
    case SET_RECRUITS_PAGE: {
      return {
        ...state,
        recruitsPage: action.payload,
      };
    }
    case SET_RECRUITS_ERROR: {
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    }
    case SET_RECRUITS_STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }

    default:
      return state;
  }
};

export default recruitsReducer;
