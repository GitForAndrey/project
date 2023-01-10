import { queryRecruitsData, queryRecruitsTags } from '../../data/queries';
import { getRequestFromDB } from '../../db/db';

export const SET_RECRUITS_DATA = 'SET_RECRUITS_DATA';
export const SET_RECRUITS_ERROR = 'SET_RECRUITS_ERROR';
export const SET_RECRUITS_STATUS = 'SET_RECRUITS_STATUS';
export const TOGGLE_TAGS_RECRUITS = 'TOGGLE_TAGS_RECRUITS';
export const SET_RECRUITS_PAGE = 'SET_RECRUITS_PAGE';

export const getRecruitsData = () => {
  return async function (dispatch, getState) {
    let state = getState();
    let currentPage = state.recruits.recruitsPage;
    dispatch({ type: SET_RECRUITS_STATUS, payload: 'loading' });
    try {
      let result = await getRequestFromDB(queryRecruitsData(currentPage));
      let tagResult = await getTagsForAthlete(result);
      dispatch({
        type: SET_RECRUITS_DATA,
        payload: { data: result, tagsData: tagResult, status: 'success' },
      });
    } catch (err) {
      dispatch({
        type: SET_RECRUITS_ERROR,
        payload: `Failed RECRUITS_DATA ${err}`,
      });
    }
  };
};
export const getTagsForAthlete = async data => {
  let searchId = [...new Set(data.map(i => i.id))].join(',');
  try {
    let data = await getRequestFromDB(queryRecruitsTags(searchId));
    return data;
  } catch (err) {
    return err;
  }
};
export const toggleTagsRecruits = (athleteId, item) => {
  return { type: TOGGLE_TAGS_RECRUITS, payload: { athleteId, item } };
};
export const setRecruitsPage = value => {
  return { type: SET_RECRUITS_PAGE, payload: value };
};
