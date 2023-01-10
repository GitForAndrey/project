import {
  SET_TEAMS_DATA,
  SET_TEAMS_ERROR,
  SET_TEAMS_PAGE,
  SET_TEAMS_STATUS,
  TOGGLE_FLAG_TEAMS,
  TOGGLE_TAGS_TEAMS,
} from '../actions/teamsActions';

const initialState = {
  data: [],
  activeTags: [],
  status: '',
  teamsPage: 0,
  error: false,
  errorMessage: '',
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEAMS_DATA: {
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        activeTags: [...state.activeTags, ...action.payload.activeTags],
        status: action.payload.status,
        error: false,
      };
    }
    case SET_TEAMS_PAGE: {
      return {
        ...state,
        teamsPage: action.payload,
      };
    }
    case SET_TEAMS_ERROR: {
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    }
    case SET_TEAMS_STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }
    case TOGGLE_FLAG_TEAMS: {
      const { id, value } = action.payload;

      return {
        ...state,
        data: state.data.map(i => (i.id === id ? { ...i, flag: value } : i)),
      };
    }
    case TOGGLE_TAGS_TEAMS: {
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
    default:
      return state;
  }
};

export default teamReducer;
