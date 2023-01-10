import {
  SET_ROSTER_DATA,
  SET_ROSTER_ERROR,
  SET_ROSTER_PAGE,
  SET_ROSTER_STATUS,
  TOGGLE_TAGS_ROSTER,
} from '../actions/rosterActions';

const initialState = {
  data: [],
  athleteTags: [],
  status: '',
  rosterPage: 0,
  error: false,
  errorMessage: '',
};

const rosterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROSTER_DATA: {
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        athleteTags: [...state.athleteTags, ...action.payload.tagsData],
        status: action.payload.status,
        error: false,
      };
    }
    case TOGGLE_TAGS_ROSTER: {
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
    case SET_ROSTER_PAGE: {
      return {
        ...state,
        rosterPage: action.payload,
      };
    }
    case SET_ROSTER_ERROR: {
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    }
    case SET_ROSTER_STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }

    default:
      return state;
  }
};

export default rosterReducer;
