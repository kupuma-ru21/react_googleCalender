import React, { useContext } from 'react';
import AppContext from '../contexts/AppContext';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

import { MODAL_CLOSE } from '../actions/index';
import { CREATE_CALENDER_ARRAY } from '../actions/index';

const RegisteredTitleDateModal = () => {
  const { state, dispatch } = useContext(AppContext);
  const registeredTitleInfo =
    state.modalReducer.commounFlag.registeredTitleInfo;
  const deleteTitle = () => {
    dispatch({
      type: CREATE_CALENDER_ARRAY,
      year: state.headerEvents.year,
      month: state.headerEvents.month,
      registeredTitleInfoObj: {
        registeredYear: registeredTitleInfo.year,
        registeredMonth: registeredTitleInfo.month,
        registeredTitle: registeredTitleInfo.title,
        registeredDate: registeredTitleInfo.date,
      },
    });
    dispatch({
      type: MODAL_CLOSE,
    });
  };
  const modalClose = () => {
    dispatch({
      type: MODAL_CLOSE,
    });
  };
  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <DeleteIcon style={{ cursor: 'pointer' }} onClick={deleteTitle} />
        <CloseIcon
          style={{ marginLeft: '10px', cursor: 'pointer' }}
          onClick={modalClose}
        />
      </div>
      <div>
        <span
          style={{
            display: 'inline-block',
            width: '14px',
            height: '14px',
            borderRadius: '4px',
            marginLeft: '3px',
            marginRight: '10px',
            verticalAlign: 'middle',
            backgroundColor: '#0387c7',
          }}
        >
          &nbsp;
        </span>
        <span style={{ verticalAlign: 'middle' }}>
          {registeredTitleInfo.title}
        </span>
      </div>
      <div style={{ marginTop: '20px' }}>
        <span>{registeredTitleInfo.year}年</span>
        <span>{registeredTitleInfo.month}月</span>
        <span>{registeredTitleInfo.date}日</span>
      </div>
    </div>
  );
};

export default RegisteredTitleDateModal;
