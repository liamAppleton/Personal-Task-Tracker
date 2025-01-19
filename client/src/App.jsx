import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import axios from 'axios';

const App = () => {
  const [appInitialised, setInitialised] = useState(false);
  const [formData, setFormData] = useState({});
  const [editData, setEditData] = useState({});
  const [finishedTasks, setFinishedTasks] = useState([{}]);
  const [unfinishedTasks, setUnfinishedTasks] = useState([{}]);

  useEffect(() => {
    fetchData();
  }, [formData]);

  useEffect(() => {
    if (!appInitialised) {
      setInitialised(true);
      return;
    }

    axios
      .post('http://localhost:3000/api/tasks', formData)
      .then((response) => console.log('Post recieved ' + response))
      .catch((error) => console.log('Post unsuccessful: ' + error));

    fetchData();
  }, [formData]);

  const fetchData = async () => {
    await axios
      .get('http://localhost:3000/api/tasks', formData)
      .then((response) => {
        console.log('Data fetched...');
        setFinishedTasks(response.data.filter((t) => t.status === 'finished'));
        setUnfinishedTasks(
          response.data.filter((t) => t.status === 'unfinished')
        );
      })
      .catch((error) => console.log(error));
  };

  const handleFormSubmission = (data) => {
    setFormData(data);
  };

  const buttonClicked = (data, button) => {
    const status = button === 'done' ? 'finished' : 'unfinished';
    const updatedData = { status: status };

    axios
      .put(`http://localhost:3000/api/tasks/${data._id}`, updatedData)
      .then((response) => {
        fetchData();
        console.log('Put request recieved ' + response);
      })
      .catch((error) => console.log('Put request unsuccessful: ' + error));
  };

  const deleteClicked = (data) => {
    axios
      .delete(`http://localhost:3000/api/tasks/${data._id}`)
      .then((response) => {
        fetchData();
        console.log('Item deleted successfully.');
      })
      .catch((error) => console.log('Unable to delete: ' + error));
  };

  const editClicked = (data) => {
    setEditData(data);
  };

  return (
    <>
      <div className="mb-5">
        <TaskForm getFormData={handleFormSubmission} editData={editData} />
      </div>
      <div>
        <TaskTable
          unfinishedTasks={unfinishedTasks}
          finishedTasks={finishedTasks}
          buttonClicked={buttonClicked}
          deleteClicked={deleteClicked}
          editClicked={editClicked}
        />
      </div>
    </>
  );
};

export default App;
