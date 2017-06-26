import { combineReducers } from 'redux';

import userLogin from './reducer_login';
import getAllPolls from './reducer_allPolls';
import getPoll from './reducer_getPoll';
import mapLocalStore from './reducer_mapCookie';

const rootReducer = combineReducers({
  user: userLogin,
  allPolls: getAllPolls,
  poll: getPoll,
  localStore: mapLocalStore
});

export default rootReducer;
