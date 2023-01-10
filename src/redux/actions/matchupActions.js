import { queryMatchupData, queryMatchupTags } from '../../data/queries';
import { getRequestFromDB } from '../../db/db';

export const GET_MATCHUP_DATA = 'GET_MATCHUP_DATA';
export const TOGGLE_FLAG_MATCHUP = 'TOGGLE_FLAG_MATCHUP';

export const RESET_DATA_MATCHUP = 'RESET_DATA_MATCHUP';
export const SET_MATCHUP_PAGE = 'SET_MATCHUP_PAGE';
export const SET_MATCHUP_ERROR = 'SET_MATCHUP_ERROR';
export const SET_MATCHUP_STATUS = 'SET_MATCHUP_STATUS';
export const TOGGLE_TAGS_MATCHUP = 'TOGGLE_TAGS_MATCHUP';

export const getTeamsIdData = array => {
  const data = [];
  array.map(el => {
    data.push(el.team_1_id);
    data.push(el.team_2_id);
  });
  return data;
};
export const getPlayersTags = async data => {
  let teamId = getTeamsIdData(data).join(',');
  try {
    let result = await getRequestFromDB(queryMatchupTags(teamId));
    return result;
  } catch (err) {
    return err;
  }
};
export const getMatchupData = () => {
  return async function (dispatch, getState) {
    dispatch({ type: SET_MATCHUP_STATUS, payload: 'loading' });
    let state = getState();
    // take from state active filters value  and create request with them
    let currentPage = state.matchup.matchupPage;
    try {
      let result = await getRequestFromDB(queryMatchupData(currentPage));
      let activeTags = await getPlayersTags(result);

      dispatch({
        type: GET_MATCHUP_DATA,
        payload: {
          MatchupData: result,
          ActiveTags: activeTags,
          status: 'success',
        },
      });
    } catch (err) {
      dispatch({
        type: SET_MATCHUP_ERROR,
        payload: `GET_SET_MATCHUP_ERROR , ${err}`,
      });
    }
  };
};

export const resetData = () => {
  return { type: RESET_DATA_MATCHUP };
};
export const setMatchupPage = value => {
  return { type: SET_MATCHUP_PAGE, payload: value };
};
export const toggleTagsMatchup = (athlete, item) => {
  let newItem = {
    tag_id: item.id,
    team_id: athlete.team_id,
    rid: item.updated_at,
    id: athlete.id,
  };
  return { type: TOGGLE_TAGS_MATCHUP, payload: { newItem } };
};
export const toggleFlagMatchup = (id, value) => {
  return { type: TOGGLE_FLAG_MATCHUP, payload: { id, value } };
};
