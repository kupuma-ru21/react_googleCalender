import React, { useContext, useState } from 'react';
import AddTitleDateModalInput from './AddTitleDateModalInput';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { CREATE_CALENDER_ARRAY, MODAL_CLOSE } from '../actions/index';
import AppContext from '../contexts/AppContext';

const titleStyle = {
  width: 380,
  paddingLeft: 40,
  marginBottom: 20,
};

const AddTitleDateModal = () => {
  // TextAreaに入力した「タイトルと日時」を該当する日付に表示する為の処理
  const [title_dateTime, setTitle_dateTime] = useState('');
  const { state, dispatch } = useContext(AppContext);
  const onChange = event => {
    setTitle_dateTime(event.target.value);
  };
  const onClick = () => {
    if (title_dateTime === '')
      return dispatch({
        type: MODAL_CLOSE,
      });
    dispatch({
      type: CREATE_CALENDER_ARRAY,
      title: title_dateTime,
      targetDateInfo: state.gridReducer.gridClickDateInfo,
      year: state.headerEvents.year,
      month: state.headerEvents.month,
    });
    dispatch({
      type: MODAL_CLOSE,
    });
  };
  return (
    <>
      <TextField
        autoFocus
        placeholder="タイトルと日時を追加"
        style={titleStyle}
        fontSize="large"
        className="title"
        onChange={onChange}
      />
      <AddTitleDateModalInput />
      <ButtonGroup style={{ float: 'right' }} onClick={onClick}>
        <Button style={{ backgroundColor: '#1a73e8' }}>保存</Button>
      </ButtonGroup>
    </>
  );
};

export default AddTitleDateModal;
