import { queryRosterData, queryRosterTags } from '../../data/queries';
import { getRequestFromDB } from '../../db/db';

export const SET_ROSTER_DATA = 'SET_ROSTER_DATA';
export const SET_ROSTER_ERROR = 'SET_ROSTER_ERROR';
export const SET_ROSTER_STATUS = 'SET_ROSTER_STATUS';
export const TOGGLE_TAGS_ROSTER = 'TOGGLE_TAGS_ROSTER';
export const SET_ROSTER_PAGE = 'SET_ROSTER_PAGE';

export const getRosterData = () => {
  return async function (dispatch, getState) {
    let state = getState();
    let currentPage = state.roster.rosterPage;
    dispatch({ type: SET_ROSTER_STATUS, payload: 'loading' });

    try {
      let result = await getRequestFromDB(queryRosterData(currentPage));
      let tagResult = await getTagsForAthlete(result);
      dispatch({
        type: SET_ROSTER_DATA,
        payload: { data: result, tagsData: tagResult, status: 'success' },
      });
    } catch (err) {
      dispatch({
        type: SET_ROSTER_ERROR,
        payload: `Failed ROSTER_DATA ${err}`,
      });
    }
  };
};
export const getTagsForAthlete = async data => {
  let searchId = [...new Set(data.map(i => i.id))].join(',');

  try {
    let data = await getRequestFromDB(queryRosterTags(searchId));
    return data;
  } catch (err) {
    return err;
  }
};
export const toggleTagsRoster = (athleteId, item) => {
  return { type: TOGGLE_TAGS_ROSTER, payload: { athleteId, item } };
};
export const setRosterPage = value => {
  return { type: SET_ROSTER_PAGE, payload: value };
};
