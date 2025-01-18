import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({});
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/tasks')
      .then((response) => {
        console.log('Data fetched...');
        setBackendData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFormSubmission = (data) => {
    setFormData(data);
  };

  return (
    <>
      <div className="mb-5">
        <TaskForm getFormData={handleFormSubmission} />
      </div>
      <div>
        <TaskTable storedTasks={backendData} backendData={backendData} />
      </div>
    </>
  );
};

export default App;
