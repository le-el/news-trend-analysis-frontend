import * as React from 'react';
import { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from '@mui/material/Tooltip';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import TokenCheckAlert from './TokenCheckAlert';

export default function FloatingActionButtonSize({ reload, setReload, setLoading }) {
    const [open, setOpen] = useState(false);
    const [topic, setTopic] = useState('');
    const [TokenCheckAlertOpen, setTokenCheckAlertOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTokenCheckAlertOpen = () => {
        setOpen(false);
        setTokenCheckAlertOpen(true);
    }

    const handleTokenCheckAlertClose = () => {
        setTokenCheckAlertOpen(false);
    }

    const handleDownload = async (topic_name) => {
        try {
            setLoading(true); // Start loading
            setOpen(false);
            setTokenCheckAlertOpen(false);
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/topic`, {
                'topic': topic_name
            }, {
                headers: {
                    'ngrok-skip-browser-warning': true
                }
            });
            console.log('Download started for topic:', response.data);
            setStatus(response.data.message);
            setSeverity('success');
            setAlertOpen(true);
            setReload(!reload);
        } catch (error) {
            console.error('Error starting download:', error);
            setStatus('Error starting download');
            setSeverity('error');
            setAlertOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Tooltip title="Add topic">
                <Fab size="small" color="primary" aria-label="add" onClick={handleClickOpen} sx={{ width: 40, height: 40 }}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Topic</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Topic"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" endIcon={<DownloadIcon />} onClick={handleTokenCheckAlertOpen}>Start Download</Button>
                </DialogActions>
            </Dialog>
            <TokenCheckAlert topic={topic} open={TokenCheckAlertOpen} close={handleTokenCheckAlertClose} handle={handleDownload}/>
        </>
    );
}