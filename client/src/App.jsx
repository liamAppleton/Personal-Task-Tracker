import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import axios from 'axios';

const App = () => {
  const [appInitialised, setInitialised] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState([{}]);
  const [formData, setFormData] = useState({});
  const [finishedTasks, setFinishedTasks] = useState([{}]);
  const [unfinishedTasks, setUnfinishedTasks] = useState([{}]);

  useEffect(() => {
    fetchTaskData();
  }, [formData]);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!appInitialised) {
      setInitialised(true);
      return;
    }
    console.log('Post: ', formData);
    axios
      .post('http://localhost:3000/api/tasks', formData)
      .then((response) => console.log('Post recieved ', response.data))
      .catch((error) => console.log('Post unsuccessful: ' + error));

    fetchTaskData();
  }, [formData]);

  const handleLogin = (data) => {
    if (data === 'valid') setLoggedIn(true);
  };

  const fetchUserData = async () => {
    await axios
      .get('http://localhost:3000/api/users')
      .then((response) => {
        console.log('Users fetched...', response.data);
        setUserData(response.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchTaskData = async () => {
    await axios
      .get('http://localhost:3000/api/tasks', formData)
      .then((response) => {
        console.log('Tasks fetched...', response.data);
        setFinishedTasks(response.data.filter((t) => t.status === 'finished'));
        setUnfinishedTasks(
          response.data.filter((t) => t.status === 'unfinished')
        );
      })
      .catch((error) => console.log(error));
  };

  const axiosPut = async (data, updatedData = {}) => {
    await axios
      .put(`http://localhost:3000/api/tasks/${data._id}`, updatedData)
      .then((response) => {
        fetchTaskData();
        console.log('Put request recieved ', response);
      })
      .catch((error) => console.log('Put request unsuccessful: ' + error));
  };

  const handleFormSubmission = (data) => {
    console.log('App formData upon submission: ', data);
    setFormData(data);
  };

  const buttonClicked = (data, button) => {
    const status = button === 'done' ? 'finished' : 'unfinished';
    const updatedData = { status: status };
    axiosPut(data, updatedData);
  };

  const deleteClicked = (data) => {
    axios
      .delete(`http://localhost:3000/api/tasks/${data._id}`)
      .then((response) => {
        fetchTaskData();
        console.log('Item deleted successfully.');
      })
      .catch((error) => console.log('Unable to delete: ' + error));
  };

  const handleUpdate = (data) => {
    axiosPut(data, data.updated);
  };

  return (
    <>
      {loggedIn === false ? (
        <div className="mb-5">
          <LoginForm userData={userData} login={handleLogin} />
        </div>
      ) : (
        <>
          <div className="mb-3">
            <button
              className="btn btn-danger"
              onClick={() => setLoggedIn(false)}
            >
              Log out
            </button>
          </div>
          <div className="mb-5">
            <TaskForm getFormData={handleFormSubmission} />
          </div>
          <div>
            <TaskTable
              unfinishedTasks={unfinishedTasks}
              finishedTasks={finishedTasks}
              buttonClicked={buttonClicked}
              deleteClicked={deleteClicked}
              handleUpdate={handleUpdate}
            />
          </div>
        </>
      )}
    </>
  );
};

export default App;
