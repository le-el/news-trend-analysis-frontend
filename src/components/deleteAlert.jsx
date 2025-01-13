import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { capitalizeFirstLetterOfEachWord } from '../utils/functions';

const DeleteAlert = ({ topicItem, open, handleClose, handleDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete Topic:   "}
        <span className='text-2xl text-cyan-500'>
          {capitalizeFirstLetterOfEachWord(topicItem?.topic)}
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you delete this topic, you can't recover it. Continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" autoFocus onClick={() => {
          handleDelete(topicItem.id);
        }}>
          Delete
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAlert;