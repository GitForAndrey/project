import {
  GET_MATCHUP_DATA,
  SET_MATCHUP_ERROR,
  SET_MATCHUP_PAGE,
  SET_MATCHUP_STATUS,
  TOGGLE_FLAG_MATCHUP,
  TOGGLE_TAGS_MATCHUP,
} from '../actions/matchupActions';

const initialState = {
  matchupData: [],
  activeTags: [],
  matchupPage: 0,
  status: '',
  error: false,
  errorMessage: '',
};

const matchupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATCHUP_DATA: {
      return {
        ...state,
        matchupData: [...state.matchupData, ...action.payload.MatchupData],
        activeTags: [...state.activeTags, ...action.payload.ActiveTags],
        status: action.payload.status,
        error: false,
      };
    }
    case SET_MATCHUP_ERROR: {
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    }
    case TOGGLE_TAGS_MATCHUP: {
      console.log(action.payload);
      const { newItem } = action.payload;
      let result = state.activeTags.find(
        i =>
          i.team_id == newItem.team_id &&
          i.tag_id == newItem.tag_id &&
          i.id == newItem.id,
      );
      if (result) {
        return {
          ...state,
          activeTags: state.activeTags.filter(
            i =>
              !(
                i.team_id == result.team_id &&
                i.tag_id == result.tag_id &&
                i.id == result.id
              ),
          ),
        };
      } else {
        return {
          ...state,
          activeTags: [...state.activeTags, newItem],
        };
      }
    }
    case SET_MATCHUP_PAGE: {
      return {
        ...state,
        matchupPage: action.payload,
      };
    }
    case SET_MATCHUP_STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }
    case TOGGLE_FLAG_MATCHUP: {
      const { id, value } = action.payload;

      return {
        ...state,
        matchupData: state.matchupData.map(i =>
          i.team_1_id === id
            ? { ...i, flagTeam1: value }
            : i.team_2_id === id
            ? { ...i, flagTeam2: value }
            : i,
        ),
      };
    }
    default:
      return state;
  }
};

export default matchupReducer;
