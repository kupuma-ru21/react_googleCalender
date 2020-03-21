import React from 'react';
import TextField from '@material-ui/core/TextField';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import NotesIcon from '@material-ui/icons/Notes';
import ModalInputDisplayDate from './ModalInputDisplayDate';

const inputStyle = {
  width: 330,
  paddingLeft: 20,
  marginBottom: 20,
};
const AddTitleDateModalInput = () => {
  return (
    <form noValidate autoComplete="off">
      <div>
        <span>
          <AccessTimeIcon />
          <ModalInputDisplayDate />
        </span>
      </div>
      <div>
        <PlaceOutlinedIcon />
        <TextField style={inputStyle} placeholder="場所を追加" />
      </div>
      <div>
        <NotesIcon />
        <TextField style={inputStyle} placeholder="説明を追加" />
      </div>
    </form>
  );
};

export default AddTitleDateModalInput;
