import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import UpdateIcon from '@mui/icons-material/Update';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteAlert from './deleteAlert';
import axios from 'axios'
import { useAlert } from './alertContext';

const TopicsTable = ({ reload, setReload, setLoading }) => {
  const [id, setID] = useState()
  const [data, setData] = useState([{ id: 1, topic: "", updatedDate: "" }]);
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // status from alert context
  const { setStatus, setSeverity, setAlertOpen } = useAlert()


  useEffect(() => {
    // Fetch data here and set it in state
    const fetchData = async () => {
      try {
        const response = await axios.get("https://gull-upright-actively.ngrok-free.app/topics",
          {
            headers: {
              'ngrok-skip-browser-warning': 'true' // You can set this to any value
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

  const handleUpdate = async (id) => {
    setLoading(true); // Ensure the correct spelling of setLoading
    try {
      const response = await axios.post(`https://gull-upright-actively.ngrok-free.app/topic/${id}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'true' // You can set this to any value
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
    const response = await axios.delete(`https://gull-upright-actively.ngrok-free.app/topic/${id}`,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true' // You can set this to any value
        }
      })
    console.log(response.data);
    setReload(!reload);
  };

  const handleClose = () => {
    setOpen(false);
  }

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
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.topic}</td>
              <td>{item.updatedDate}</td>
              <td>
                <IconButton color="primary" aria-label="Update topic" onClick={() => handleUpdate(item.id)}>
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
                  setID(item.id)
                }}>
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteAlert id={id} open={open} handleClose={handleClose} handleDelete={handleDelete} />
    </>
  );
};

export default TopicsTable;