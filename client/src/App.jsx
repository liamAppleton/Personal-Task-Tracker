import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/tasks')
      .then((response) => console.log(response.data))
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
        <TaskTable />
      </div>
    </>
  );
};

export default App;
