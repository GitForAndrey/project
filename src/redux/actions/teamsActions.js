import { queryTeamsData, queryTeamsTags } from '../../data/queries';
import { getRequestFromDB } from '../../db/db';

export const SET_TEAMS_DATA = 'SET_TEAMS_DATA';
export const SET_TEAMS_ERROR = 'SET_TEAMS_ERROR';
export const SET_TEAMS_STATUS = 'SET_TEAMS_STATUS';
export const TOGGLE_FLAG_TEAMS = 'TOGGLE_FLAG_TEAMS';
export const SET_TEAMS_PAGE = 'SET_TEAMS_PAGE';
export const TOGGLE_TAGS_TEAMS = 'TOGGLE_TAGS_TEAMS';

export const getPlayersTags = async data => {
  let teamId = data.map(el => el.id).join(',');

  try {
    let result = await getRequestFromDB(queryTeamsTags(teamId));
    return result;
  } catch (err) {
    return err;
  }
};
export const getTeamsData = () => {
  return async function (dispatch, getState) {
    let state = getState();
    let currentPage = state.team.teamsPage;
    dispatch({ type: SET_TEAMS_STATUS, payload: 'loading' });

    try {
      let result = await getRequestFromDB(queryTeamsData(currentPage));
      let activeTags = await getPlayersTags(result);

      dispatch({
        type: SET_TEAMS_DATA,
        payload: { data: result, activeTags, status: 'success' },
      });
    } catch (err) {
      dispatch({
        type: SET_TEAMS_ERROR,
        payload: `Failed TEAMS_DATA ${err}`,
      });
    }
  };
};
export const setTeamsPage = value => {
  return { type: SET_TEAMS_PAGE, payload: value };
};
export const toggleTagsTeams = (athlete, item) => {
  let newItem = {
    tag_id: item.id,
    team_id: athlete.team_id,
    rid: item.updated_at,
    id: athlete.id,
  };
  return { type: TOGGLE_TAGS_TEAMS, payload: { newItem } };
};
export const toggleFlagTeams = (id, value) => {
  return { type: TOGGLE_FLAG_TEAMS, payload: { id, value } };
};
