import React, { useState, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material'
import { capitalizeFirstLetterOfEachWord } from '../utils/functions';

const DeleteAlert = ({ topicItem, open, handleClose, handleDelete }) => {
  const [confirmText, setConfirmText] = useState('');
  const handleConfirmTextChange = (e) => {
    setConfirmText(e.currentTarget.value);
  }
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
        <Box
          component="form"
          sx={{ '& > :not(style)': { mt: '1rem', width: '100%' } }}
          noValidate
          autoComplete="off"
        >
          <TextField id='delete-confirm' variant='filled' label='Write the topic name to confirm' onChange={handleConfirmTextChange} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" autoFocus onClick={() => {
          handleDelete(topicItem, confirmText);
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