import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import CreateUserForm from './components/CreateUserForm';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import axios from 'axios';

const App = () => {
  const [appInitialised, setInitialised] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountCreation, setCreation] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userData, setUserData] = useState([{}]);
  const [formData, setFormData] = useState({});
  const [finishedTasks, setFinishedTasks] = useState([{}]);
  const [unfinishedTasks, setUnfinishedTasks] = useState([{}]);

  // Effect hooks
  useEffect(() => {
    fetchTaskData();
  }, [formData, loggedIn]);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    // Fetches task data only when app initialised to prevent axios throwing error
    if (!appInitialised) {
      setInitialised(true);
      return;
    }

    axios
      .post('http://localhost:3000/api/tasks', formData)
      .then((response) => console.log('Task post recieved...'))
      .catch((error) => console.log('Task post unsuccessful: ' + error));

    fetchTaskData();
  }, [formData]);

  // Function to handle user login/creation
  const handleLogin = (data) => {
    if (data.valid === 'valid') {
      setCurrentUser(data.username);
      setLoggedIn(true);
    }
  };

  const handleCreateUser = async (data) => {
    try {
      await axios
        .post('http://localhost:3000/api/users', data)
        .then((response) => console.log('User post recieved...'))
        .catch((error) => console.log('User post unsuccesful: ', error));
      await fetchUserData();
    } catch (error) {
      console.log(error.messsage);
    }
  };

  const accountCreationPageSwitch = (bool) => {
    bool === true ? setCreation(true) : setCreation(false);
  };

  // Functions to fetch user/task data
  const fetchUserData = async () => {
    try {
      await axios
        .get('http://localhost:3000/api/users')
        .then((response) => {
          console.log('Users fetched...');
          setUserData(response.data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTaskData = async () => {
    try {
      await axios
        .get('http://localhost:3000/api/tasks', formData)
        .then((response) => {
          console.log('Tasks fetched...');
          const tasks = response.data
            .filter((t) => t.user === currentUser)
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

          setFinishedTasks(tasks.filter((t) => t.status === 'finished'));
          setUnfinishedTasks(tasks.filter((t) => t.status === 'unfinished'));
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const axiosPut = async (data, updatedData = {}) => {
    try {
      await axios
        .put(`http://localhost:3000/api/tasks/${data._id}`, updatedData)
        .then((response) => {
          fetchTaskData();
          console.log('Put request recieved...');
        })
        .catch((error) => console.log('Put request unsuccessful: ' + error));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmission = (data) => {
    setFormData(data);
  };

  // TaskForm click handlers
  const buttonClicked = (data, button) => {
    const status = button === 'done' ? 'finished' : 'unfinished';
    const updatedData = { status: status };

    axiosPut(data, updatedData);
  };

  const deleteClicked = (data) => {
    try {
      axios
        .delete(`http://localhost:3000/api/tasks/${data._id}`)
        .then((response) => {
          console.log('Item deleted successfully.');
          fetchTaskData();
        })
        .catch((error) => console.log('Unable to delete: ' + error));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (data) => {
    axiosPut(data, data.updated);
  };

  return (
    <>
      {loggedIn === false ? (
        accountCreation === false ? (
          <div className="mb-5">
            <LoginForm
              userData={userData}
              login={handleLogin}
              accountCreation={accountCreationPageSwitch}
            />
          </div>
        ) : (
          <div className="mb-5">
            <CreateUserForm
              newUser={handleCreateUser}
              accountCreation={accountCreationPageSwitch}
            />
          </div>
        )
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
            <TaskForm
              getFormData={handleFormSubmission}
              currentUser={currentUser}
            />
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
