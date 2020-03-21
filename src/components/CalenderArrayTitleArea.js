import React, { useContext } from 'react';

import AppContext from '../contexts/AppContext';
import { MODAL_OPEN } from '../actions/index';

const CalenderArrayTitleArea = ({ val }) => {
  const { dispatch } = useContext(AppContext);

  const handleOpen = event => {
    const clickData = event.currentTarget.dataset;
    dispatch({
      type: MODAL_OPEN,
      title: clickData.title,
      year: Number(clickData.year),
      month: Number(clickData.month),
      date: Number(clickData.date),
    });
    event.stopPropagation();
  };

  return (
    <div>
      <div type="button">
        {val.titleArray === undefined
          ? ''
          : val.titleArray.map((title, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#0387c7',
                  padding: '0 8px',
                  marginBottom: '2px',
                  borderRadius: '5px',
                  textAlign: 'left',
                }}
                data-title={title}
                data-year={val.year}
                data-month={val.month}
                data-date={val.date}
                onClick={handleOpen}
              >
                {title}
              </div>
            ))}
      </div>
    </div>
  );
};

export default CalenderArrayTitleArea;
