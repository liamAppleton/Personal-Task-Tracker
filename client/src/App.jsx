import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import axios from 'axios';

const App = () => {
  const [appInitialised, setInitialised] = useState(false);
  const [formData, setFormData] = useState({});
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
      .then((response) => console.log('Post recieved' + response))
      .catch((error) => console.log('Post unsuccessful: ' + error));

    fetchData();
  }, [formData]);

  const fetchData = async () => {
    await axios
      .get('http://localhost:3000/api/tasks')
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

  return (
    <>
      <div className="mb-5">
        <TaskForm getFormData={handleFormSubmission} />
      </div>
      <div>
        <TaskTable
          unfinishedTasks={unfinishedTasks}
          finishedTasks={finishedTasks}
        />
      </div>
    </>
  );
};

export default App;
