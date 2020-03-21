import { HEADER_INCREMENT, HEADER_DECREMENT } from '../actions/index';

const headerEvents = (state = {}, action) => {
  switch (action.type) {
    case HEADER_INCREMENT:
      if (action.month === 12) {
        action.year = action.year + 1;
        action.month = 1;
        return { year: action.year, month: action.month };
      }
      action.month = action.month + 1;
      return { year: action.year, month: action.month };
    case HEADER_DECREMENT:
      if (action.month === 1) {
        action.year = action.year - 1;
        action.month = 12;
        return { year: action.year, month: action.month };
      }
      action.month = action.month - 1;
      return { year: action.year, month: action.month };
    default:
      return state;
  }
};

export default headerEvents;
