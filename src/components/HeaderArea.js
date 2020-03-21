import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import AppContext from '../contexts/AppContext';

import { HEADER_INCREMENT, HEADER_DECREMENT } from '../actions/index';

const HeaderArea = () => {
  const { state, dispatch } = useContext(AppContext);

  const increment = () => {
    dispatch({
      type: HEADER_INCREMENT,
      year: state.headerEvents.year,
      month: state.headerEvents.month,
    });
  };

  const decrement = () => {
    dispatch({
      type: HEADER_DECREMENT,
      year: state.headerEvents.year,
      month: state.headerEvents.month,
    });
  };

  return (
    <div>
      <Button variant="contained">
        <MenuIcon />
      </Button>
      <span style={{ fontSize: 20, marginLeft: 10 }}>カレンダー</span>
      <Button onClick={decrement}>
        <KeyboardArrowLeftIcon fontSize="large" />
      </Button>
      <Button onClick={increment}>
        <KeyboardArrowRightIcon fontSize="large" />
      </Button>
      <span>
        {state.headerEvents.year}年{state.headerEvents.month}月
      </span>
    </div>
  );
};

export default HeaderArea;
