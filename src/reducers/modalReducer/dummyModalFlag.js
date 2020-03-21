import { MODAL_OPEN, MODAL_CLOSE } from '../../actions';

const commounFlag = (state = {}, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      if (action.title !== undefined)
        return {
          ...state,
          commonModalFlag: true,
          titleFlag: true,
          registeredTitleInfo: {
            year: action.year,
            month: action.month,
            date: action.date,
            title: action.title,
          },
        };
      return {
        ...state,
        commonModalFlag: true,
        titleFlag: false,
        registeredTitleInfo: {},
      };
    case MODAL_CLOSE:
      return {
        ...state,
        commonModalFlag: false,
        titleFlag: false,
        registeredTitleInfo: {},
      };
    default:
      return state;
  }
};

export default commounFlag;
