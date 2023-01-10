import {
  GET_SCHEDULE_DATA,
  RESET_DATA,
  SET_SCHEDULE_ERROR,
  SET_SCHEDULE_PAGE,
  SET_SCHEDULE_STATUS,
  TOGGLE_FLAG_SCHEDULE,
  TOGGLE_TAGS_SCHEDULE,
} from '../actions/scheduleActions';

const initialState = {
  scheduleData: [],
  players: [],
  athleteTags: [],
  schedulePage: 0,
  status: '',
  error: false,
  errorMessage: '',
};

const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULE_DATA: {
      return {
        ...state,
        players: [...state.players, ...action.payload.PlayersData],
        scheduleData: [...state.scheduleData, ...action.payload.ScheduleData],
        athleteTags: [...state.athleteTags, ...action.payload.PlayersTags],
        status: action.payload.status,
        error: false,
      };
    }
    case SET_SCHEDULE_ERROR: {
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    }
    case SET_SCHEDULE_STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }
    case RESET_DATA: {
      return {
        ...state,
        scheduleData: [],
        players: [],
        currentPage: 0,
      };
    }
    case SET_SCHEDULE_PAGE: {
      return {
        ...state,
        schedulePage: action.payload,
      };
    }
    case TOGGLE_FLAG_SCHEDULE: {
      const { id, value } = action.payload;

      return {
        ...state,
        scheduleData: state.scheduleData.map(i =>
          i.team_1_id === id
            ? { ...i, flagTeam1: value }
            : i.team_2_id === id
            ? { ...i, flagTeam2: value }
            : i,
        ),
      };
    }
    case TOGGLE_TAGS_SCHEDULE: {
      const { athleteId, item } = action.payload;
      const result = state.athleteTags.find(
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

    default:
      return state;
  }
};

export default scheduleReducer;
