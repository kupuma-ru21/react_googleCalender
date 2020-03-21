import { combineReducers } from 'redux';

import headerEvents from './header';
import gridReducer from './gridReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  headerEvents,
  gridReducer,
  modalReducer,
});
