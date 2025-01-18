import { useState } from 'react';
import TaskForm from './components/TaskForm';

const App = () => {
  const [formData, setFormData] = useState([]);

  return (
    <>
      <TaskForm />
    </>
  );
};

export default App;
