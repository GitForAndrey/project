import {
  queryScheduleData,
  querySchedulePlayers,
  queryScheduleTags,
} from '../../data/queries';
import { getRequestFromDB } from '../../db/db';

export const GET_SCHEDULE_DATA = 'GET_SCHEDULE_DATA';
export const TOGGLE_FLAG_SCHEDULE = 'TOGGLE_FLAG_SCHEDULE';
export const TOGGLE_TAGS_SCHEDULE = 'TOGGLE_TAGS_SCHEDULE';

export const RESET_DATA = 'RESET_DATA';
export const SET_SCHEDULE_PAGE = 'SET_SCHEDULE_PAGE';
export const SET_SCHEDULE_ERROR = 'SET_SCHEDULE_ERROR';
export const SET_SCHEDULE_STATUS = 'SET_SCHEDULE_STATUS';

export const getScheduleData = () => {
  return async function (dispatch, getState) {
    dispatch({ type: SET_SCHEDULE_STATUS, payload: 'loading' });
    let state = getState();
    // take from state active filters value  and create request with them
    let currentPage = state.schedule.schedulePage;
    let { activeFilter } = state.scheduleFilter;

    try {
      let result = await getRequestFromDB(
        queryScheduleData(currentPage, activeFilter),
      );
      let players = await getPlayersData(result);
      let tags = await getTagsForAthlete(players);
      dispatch({
        type: GET_SCHEDULE_DATA,
        payload: {
          ScheduleData: result,
          PlayersData: players,
          PlayersTags: tags,
          status: 'success',
        },
      });
    } catch (err) {
      dispatch({
        type: SET_SCHEDULE_ERROR,
        payload: `GET_SCHEDULE_DATA_ERROR , ${err}`,
      });
    }
  };
};
export const getTeamsIdData = array => {
  const data = [];
  array.map(el => {
    data.push(el.team_1_id);
    data.push(el.team_2_id);
  });
  return data;
};
export const getPlayersData = async data => {
  let searchId = getTeamsIdData(data).join(',');

  try {
    let result = await getRequestFromDB(querySchedulePlayers(searchId));
    return result;
  } catch (err) {
    return err;
  }
};
export const resetData = () => {
  return { type: RESET_DATA };
};
export const setSchedulePage = value => {
  return { type: SET_SCHEDULE_PAGE, payload: value };
};
export const toggleFlagSchedule = (id, value) => {
  return { type: TOGGLE_FLAG_SCHEDULE, payload: { id, value } };
};

export const getTagsForAthlete = async data => {
  let searchId = [...new Set(data.map(i => i.id))].join(',');

  try {
    let data = await getRequestFromDB(queryScheduleTags(searchId));
    return data;
  } catch (err) {
    return err;
  }
};
export const toggleTagsSchedule = (athleteId, item) => {
  return { type: TOGGLE_TAGS_SCHEDULE, payload: { athleteId, item } };
};
