import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Typography, Link } from '@mui/material';
import { capitalizeFirstLetterOfEachWord } from '../utils/functions';
import axios from 'axios';

const TokenCheckAlert = ({ topic, open, close, handle }) => {
  const [checkResponse, setCheckResponse] = React.useState(null);
  useEffect(() => {
    setCheckResponse(null);
  }, [topic, topic?.id])
  useEffect(() => {
    let isMounted = true;
    if (open && isMounted && !checkResponse) {
      const checkUpdate = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/topic/checkforupdate/${topic.id ? topic?.topic : topic}`, {
          headers: {
            'ngrok-skip-browser-warning': true
          }
        });
        console.log("this is response", response.data);
        setCheckResponse(response.data);
      };
      checkUpdate();
    }
    return () => {
      isMounted = false;
    };
  }, [open, checkResponse]);

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="update-dialog-title"
      aria-describedby="update-dialog-description"
    >
      {topic?.topic
        ?
        <DialogTitle id="update-dialog-title">{'Update Topic:   '}
          <span className='text-2xl text-cyan-500'>
            {capitalizeFirstLetterOfEachWord(topic?.topic)}
          </span>
        </DialogTitle>
        :
        <DialogTitle id="update-dialog-title">{'Add New Topic:   '}
          <span className='text-2xl text-cyan-500'>
            {capitalizeFirstLetterOfEachWord(topic)}
          </span>
        </DialogTitle>
      }
      <DialogContent>
        <DialogContentText id="update-dialog-description">
          {topic?.topic ? 'Please review this information carefully before starting topic updates.' : 'Please review this information carefully before starting new topic'}
          {checkResponse ?
            <div>
              <Typography variant="h6">Last Updated: {checkResponse.topic_update}</Typography>
              <Typography variant="h6">Expected token usage: {checkResponse.expected_token_usage}</Typography>
              <Typography variant="h6">{'Available token amount:   '}
                <Link href="https://newsapi.ai/dashboard?tab=home" target="_blank" rel="noopener noreferrer">
                  Check from this link
                </Link>
              </Typography>
            </div>
            :
            <div>
              <Typography variant="h6">Loading...</Typography>
            </div>
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" autoFocus onClick={() => {
          handle(topic);
        }}>
          Continue
        </Button>
        <Button onClick={close} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TokenCheckAlert;