import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import style from '../styles/style';
import AppContext from '../contexts/AppContext';
import { CREATE_CALENDER_ARRAY, GET_CLICK_DATE } from '../actions/index';

import CalenderArrayTitleArea from './CalenderArrayTitleArea';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));
const todayStyle = {
  backgroundColor: '#1a73e8',
  borderRadius: '25px',
  display: 'inline-block',
  width: '27px',
  height: '27px',
  marginBottom: '10px',
};

const CalenderArrayArea = props => {
  const classes = useStyles();

  const { state, dispatch } = useContext(AppContext);
  useEffect(() => {
    dispatch({
      type: CREATE_CALENDER_ARRAY,
      year: state.headerEvents.year,
      month: state.headerEvents.month,
    });
  }, [dispatch, state.headerEvents.year, state.headerEvents.month]);

  // クリックした日付を ModalInputDisplayDateに渡す為
  const getClickDate = event => {
    const clickData = event.currentTarget.dataset;
    dispatch({
      type: GET_CLICK_DATE,
      year: Number(clickData.year),
      month: Number(clickData.month),
      date: Number(clickData.date),
    });
  };

  // クリックした箇所がモーダルかタイトルか判別しモーダルの表示制御を行う

  const shouldDisplayCalenderArray = state.gridReducer.calenderArray;

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          {shouldDisplayCalenderArray.map((val, index) => (
            <Grid
              item
              xs={2}
              style={style}
              key={index}
              data-year={val.year}
              data-month={val.month}
              data-date={val.date}
              onClick={getClickDate}
            >
              <div>{val.day}</div>
              <div>
                {val.date === 1 ? `${val.month}月` : ''}
                <span
                  style={
                    state.headerEvents.year === new Date().getFullYear() &&
                    state.headerEvents.month === new Date().getMonth() + 1 &&
                    val.date === new Date().getDate()
                      ? todayStyle
                      : { marginBottom: '10px' }
                  }
                >
                  {val.date === 1 ? '1日' : val.date}
                </span>
              </div>
              <CalenderArrayTitleArea key={index} val={val} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default CalenderArrayArea;
