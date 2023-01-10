import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import { getFiltersData } from './scheduleFilterActions';
import { getALLTags } from './athleteTagsActions';
import { initDB } from '../../db/db';

export const SET_AUTH_DATA = 'SET_AUTH_DATA';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const INIT_DB = 'INIT_DB';
export const STATUS_DB = 'STATUS_DB';

export const getFacebookAuth = () => {
  return function (dispatch) {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          dispatch({ type: SET_AUTH_ERROR, payload: 'Login cancelled' });
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            dispatch({ type: SET_AUTH_DATA, payload: data.accessToken });
          });
        }
      },
      function (err) {
        dispatch({ type: SET_AUTH_ERROR, payload: err });
      },
    );
  };
};

export const checkDbStatus = () => {
  return async function (dispatch) {
    const value = await AsyncStorage.getItem('DbStorageName');
    if (value !== null) {
      dispatch({ type: STATUS_DB });
      let result = await initDB(value);
      if (result === 'success') {
        dispatch({ type: INIT_DB });
        dispatch(getFiltersData());
        dispatch(getALLTags());
      } else {
        dispatch({ type: SET_AUTH_ERROR, payload: result });
      }
    }
  };
};

export const getDbFromServer = () => {
  return async function (dispatch) {
    console.log('start');
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch(
        'GET',
        'https://firebasestorage.googleapis.com/v0/b/testathleteproject.appspot.com/o/event.db?alt=media&token=39ea06c0-ba34-451f-bc81-e36c965e89b0',
        {},
      )
      .then(async res => {
        console.log(res.path());
        let result = await initDB(res.path());
        console.log(result);
        if (result === 'success') {
          console.log('db start');
          dispatch(getFiltersData());
          dispatch(getALLTags());
          dispatch({ type: INIT_DB });

          try {
            AsyncStorage.setItem('DbStorageName', res.path());
          } catch (e) {
            console.log('set asyncStorage', e);
          }
        } else {
          dispatch({ type: SET_AUTH_ERROR, payload: result });
        }
      });
  };
};
