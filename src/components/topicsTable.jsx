import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import UpdateIcon from '@mui/icons-material/Update';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteAlert from './deleteAlert';
import TokenCheckAlert from './TokenCheckAlert';
import axios from 'axios'
import { useAlert } from './alertContext';

const TopicsTable = ({ reload, setReload, setLoading }) => {
  const [topicItem, setTopitcItem] = useState(null)
  const [data, setData] = useState([{ id: 1, topic: "", updatedDate: "" }]);
  const [open, setOpen] = useState(false);
  const [updateAlertOpen, setUpdateAlertOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // status from alert context
  const { setStatus, setSeverity, setAlertOpen } = useAlert()

  useEffect(() => {
    // Fetch data here and set it in state
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/topics`, {
          headers: {
          'ngrok-skip-browser-warning': true
          }
        });
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
      }
    };

    fetchData();
  }, [reload]);

  const handleUpdate = async (topic) => {
    setUpdateAlertOpen(false);
    setLoading(true); // Ensure the correct spelling of setLoading
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/topic/${topic.id}`, {
        headers: {
        'ngrok-skip-browser-warning': true,
        }
      });
      const { message } = response.data;

      console.log(message);
      setStatus(message);
      setSeverity('success');
      setAlertOpen(true);
    } catch (error) {
      console.error('Error updating topic:', error);
      setStatus('An error occurred while updating the topic.');
      setSeverity('error');
      setAlertOpen(true);
    } finally {
      setLoading(false);
      setReload(!reload)
    }
  };

  const handleResultDisplay = (id, name) => {
    navigate(`topics/${id}`, {
      state: {
        topic_name: name
      }
    })
  };

  const handleDelete = async (id) => {
    setOpen(false);
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/topic/${id}`, {
      headers: {
      'ngrok-skip-browser-warning': true
      }
    })
    console.log(response.data);
    setReload(!reload);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateClose = () => {
    setUpdateAlertOpen(false);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Updated Date</th>
            <th>Update</th>
            <th>Result Display</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>{item.topic}</td>
              <td>{item.updatedDate}</td>
              <td>
                <IconButton color="primary" aria-label="Update topic" onClick={() => {
                  setUpdateAlertOpen(true);
                  setTopitcItem(item);
                }}>
                  <UpdateIcon />
                </IconButton>
              </td>
              <td>
                <IconButton color="primary" aria-label="View topic" onClick={() => handleResultDisplay(item.id, item.topic)}>
                  <VisibilityIcon />
                </IconButton>
              </td>
              <td>
                <IconButton color="primary" aria-label="Delete topic" onClick={() => {
                  setOpen(true);
                  setTopitcItem(item)
                }}>
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteAlert topicItem={topicItem} open={open} handleClose={handleClose} handleDelete={handleDelete} />
      {topicItem && <TokenCheckAlert topic={topicItem} open={updateAlertOpen} close={handleUpdateClose} handle={handleUpdate} />}
    </>
  );
};

export default TopicsTable;