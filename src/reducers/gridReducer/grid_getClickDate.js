import { GET_CLICK_DATE } from '../../actions/index';

const gridClickDateInfo = (state = {}, action) => {
  switch (action.type) {
    case GET_CLICK_DATE:
      return { year: action.year, month: action.month, date: action.date };
    default:
      return state;
  }
};

export default gridClickDateInfo;
