import React, { useReducer } from 'react';

import AppContext from '../contexts/AppContext';
import reducer from '../reducers';
import HeaderArea from './HeaderArea';
import CalenderArea from './CalenderArea';

const App = () => {
  const initialState = {
    headerEvents: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    },
    gridReducer: { calenderArray: [], gridClickDateInfo: {} },
    modalReducer: {
      commounFlag: {
        commonModalFlag: false,
        titleFlag: false,
        registeredTitleInfo: {},
      },
    },
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <AppContext.Provider value={{ state, dispatch }}>
        <HeaderArea />
        <CalenderArea />
      </AppContext.Provider>
    </div>
  );
};

export default App;
