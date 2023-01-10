import {
  queryDeleteTagsData,
  queryGetALLTags,
  queryInsertTagsData,
} from '../../data/queries';
import { SQLInsert, SQLDelete, getRequestFromDB } from '../../db/db';
import { toggleTagsMatchup } from './matchupActions';
import { toggleTagsRecruits } from './recruitsAction';
import { toggleTagsRoster } from './rosterActions';
import { toggleTagsSchedule } from './scheduleActions';
import { toggleTagsTeams } from './teamsActions';

export const SET_ATHLETE_TAGS_ERROR = 'SET_ATHLETE_TAGS_ERROR';
export const SET_SELECTED_ATHLETE = 'SET_SELECTED_ATHLETE';
export const SET_ALL_TAGS = 'SET_ALL_TAGS';
export const TOGGLE_TAGS = 'TOGGLE_TAGS';

export const updateTagsData = (athlete, element) => {
  console.log(athlete, element);
  return async function (dispatch) {
    dispatch(toggleTagsRoster(athlete.id, element));
    dispatch(toggleTagsSchedule(athlete.id, element));
    dispatch(toggleTagsRecruits(athlete.id, element));
    dispatch(toggleTags(athlete.id, element));
    dispatch(toggleTagsTeams(athlete, element));
    dispatch(toggleTagsMatchup(athlete, element));

    let insertParams = [athlete.id, '55555', element.id];

    try {
      let resultDelete = await SQLDelete(
        queryDeleteTagsData(athlete.id, element.id),
      );
      if (resultDelete === 0) {
        await SQLInsert(queryInsertTagsData, insertParams);
      }
    } catch (err) {
      dispatch({
        type: SET_ATHLETE_TAGS_ERROR,
        payload: `SET_ATHLETE_TAGS_ERROR ${err}`,
      });
    }
  };
};
export const getALLTags = () => {
  return async function (dispatch) {
    try {
      let data = await getRequestFromDB(queryGetALLTags);
      dispatch({
        type: SET_ALL_TAGS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: SET_ATHLETE_TAGS_ERROR,
        payload: `Failed SET_ALL_TAGS ${err}`,
      });
    }
  };
};
export const setSelectedAthlete = (athlete, tags) => {
  return { type: SET_SELECTED_ATHLETE, payload: { athlete, tags } };
};
export const toggleTags = (athleteId, item) => {
  return { type: TOGGLE_TAGS, payload: { athleteId, item } };
};
