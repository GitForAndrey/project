import { queryInsertFlag, queryUpdateFlag } from '../../data/queries';
import { SQLInsert, SQLUpdate } from '../../db/db';
import { toggleFlagMatchup } from './matchupActions';
import { toggleFlagSchedule } from './scheduleActions';
import { toggleFlagTeams } from './teamsActions';

export const SET_FLAG_ERROR = 'SET_TEAMS_ERROR';

export const updateFlagData = (value, id) => {
  return async function (dispatch) {
    let newValue = (value + 1) % 3;

    dispatch(toggleFlagSchedule(id, newValue));
    dispatch(toggleFlagTeams(id, newValue));
    dispatch(toggleFlagMatchup(id, newValue));

    let insertParams = [newValue, id, '777777'];
    let updateParams = [newValue, id];

    try {
      let resultUpdate = await SQLUpdate(queryUpdateFlag, updateParams);
      if (resultUpdate == 0) {
        await SQLInsert(queryInsertFlag, insertParams);
      }
    } catch (err) {
      dispatch({
        type: SET_FLAG_ERROR,
        payload: `SET_FLAG_ERROR ${err}`,
      });
    }
  };
};
