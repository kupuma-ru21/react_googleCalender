import { combineReducers } from 'redux';

import calenderArray from './grid_relationCalender';
import gridClickDateInfo from './grid_getClickDate';

const gridReducer = combineReducers({
  calenderArray,
  gridClickDateInfo,
});

export default gridReducer;
