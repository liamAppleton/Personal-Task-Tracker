import { useRef, useState } from 'react';
import { validateForm } from '../utils/utils';

const TaskForm = ({ getFormData, currentUser }) => {
  const [error, setError] = useState('');
  const taskRef = useRef(null);
  const descriptionRef = useRef(null);
  const dateRef = useRef(null);

  const handleSubmit = () => {
    const date = dateRef.current.value
      ? new Date(dateRef.current.value).toISOString().split('T')[0]
      : '';
    const inputs = {
      title: taskRef.current.value,
      description: descriptionRef.current.value,
      dueDate: date,
      status: 'unfinished',
      user: currentUser,
    };

    const validation = validateForm(inputs);
    if (validation !== 'valid') {
      setError(validation);
      return;
    }

    setError('');

    for (let item in inputs) {
      if (inputs[item] === '') delete inputs[item];
    }

    getFormData(inputs);

    taskRef.current.value = '';
    descriptionRef.current.value = '';
    dateRef.current.value = '';
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit();
        }}
      >
        <div className="mb-3">
          <label htmlFor="task" className="form-label">
            Task:{' '}
          </label>
          <input ref={taskRef} id="task" type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:{' '}
          </label>
          <input
            ref={descriptionRef}
            id="description"
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date-due" className="form-label">
            Date due:{' '}
          </label>
          <input
            ref={dateRef}
            id="date-due"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className="input-group date"
          />
        </div>
        <div className="d-flex flex-d-row">
          <button type="submit" className="btn btn-primary me-2">
            Add
          </button>
        </div>

        {error && <p className="text-danger">{error}</p>}
      </form>
    </>
  );
};

export default TaskForm;
