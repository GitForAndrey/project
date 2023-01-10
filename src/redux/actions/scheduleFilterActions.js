import { format } from 'date-fns';
import { queryScheduleTDate, queryScheduleTime } from '../../data/queries';
import { getRequestFromDB } from '../../db/db';

export const SET_FILTER_VALUE = 'SET_FILTER_VALUE';
export const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER';
export const SET_FILTER_VALUE_ERROR = 'SET_FILTER_VALUE_ERROR';

export const getFiltersData = () => {
  return async function (dispatch) {
    //take from DB all date and time value without repeats data

    try {
      let resultDateTime = await getRequestFromDB(queryScheduleTime);
      let resultDate = await getRequestFromDB(queryScheduleTDate);
      let filtersValue = [];
      resultDate.map((elDate, index) => {
        let value = {
          id: index,
          dbValue: elDate.sdate,
          value: format(new Date(`${elDate.sdate}`), 'EEEE MM/dd'),
          times: [],
        };
        resultDateTime.map((el, i) => {
          if (elDate.sdate == el.sdate) {
            value.times.push({
              id: i,
              dbValue: el.stime,
              value: format(new Date(`${el.sdate} ${el.stime}`), 'hh:mm a'),
            });
          }
        });
        filtersValue.push(value);
      });
      dispatch({ type: SET_FILTER_VALUE, payload: filtersValue });
      dispatch({
        type: SET_ACTIVE_FILTER,
        payload: {
          Date: {
            value: filtersValue[0].value,
            dbValue: filtersValue[0].dbValue,
          },
          Time: {
            value: filtersValue[0].times[0].value,
            dbValue: filtersValue[0].times[0].dbValue,
          },
        },
      });
    } catch (err) {
      dispatch({
        type: SET_FILTER_VALUE_ERROR,
        payload: `getFiltersData ${err}`,
      });
    }
  };
};
export const setActiveFilters = value => {
  return {
    type: SET_ACTIVE_FILTER,
    payload: value,
  };
};
