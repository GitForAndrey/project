import {
  applyMiddleware,
  legacy_createStore,
  combineReducers,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import athleteTagsReducer from './reducers/athleteTagsReducer';
import onAuthReducer from './reducers/onAuthReducer';
import matchupReducer from './reducers/matchupReducer';
import recruitsReducer from './reducers/recruitsReducer';
import rosterReducer from './reducers/rosterReducer';
import scheduleFilterReducer from './reducers/scheduleFilterReducer';
import scheduleReducer from './reducers/scheduleReducer';
import selectFlagReducer from './reducers/selectFlagReducer';
import teamReducer from './reducers/teamReducer';

const rootReducer = combineReducers({
  auth: onAuthReducer,
  roster: rosterReducer,
  team: teamReducer,
  schedule: scheduleReducer,
  scheduleFilter: scheduleFilterReducer,
  selectFlag: selectFlagReducer,
  athleteTags: athleteTagsReducer,
  matchup: matchupReducer,
  recruits: recruitsReducer,
});
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);
