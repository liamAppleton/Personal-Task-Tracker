import { useState } from 'react';
import TaskForm from './components/TaskForm';

const App = () => {
  const [formData, setFormData] = useState({});

  const handleFormSubmission = (data) => {
    setFormData(data);
  };

  return (
    <>
      <TaskForm getFormData={handleFormSubmission} />
    </>
  );
};

export default App;
