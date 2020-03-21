import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import CalenderArrayArea from './CalenderArrayArea';

import AppContext from '../contexts/AppContext';
import { MODAL_OPEN, MODAL_CLOSE } from '../actions/index';

import AddTitleDateModal from './AddTitleDateModal';
import RegisteredTitleDateModal from './RegisteredTitleDateModal';

// MaterialUiのデフォルトの定義
const getModalStyle = () => {
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
};
const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CalenderArea = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const { state, dispatch } = useContext(AppContext);

  const handleOpen = () => {
    dispatch({
      type: MODAL_OPEN,
    });
  };
  const handleClose = () => {
    dispatch({
      type: MODAL_CLOSE,
    });
  };
  const ModalArea =
    state.modalReducer.commounFlag.titleFlag === true
      ? RegisteredTitleDateModal
      : AddTitleDateModal;
  return (
    <div>
      <div type="button" onClick={handleOpen}>
        <CalenderArrayArea />
      </div>
      <Modal
        open={state.modalReducer.commounFlag.commonModalFlag}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <ModalArea />
        </div>
      </Modal>
    </div>
  );
};

export default CalenderArea;
