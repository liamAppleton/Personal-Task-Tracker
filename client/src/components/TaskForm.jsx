import { useEffect, useRef, useState } from 'react';

const TaskForm = ({ getFormData, editData }) => {
  const [error, setError] = useState('');
  const [edit, setEdit] = useState(false);
  const [localEditData, setLocalEditData] = useState({});
  const [keyProp, setKey] = useState(0);
  const taskRef = useRef(null);
  const descriptionRef = useRef(null);
  const dateRef = useRef(null);

  useEffect(() => {
    if (editData && editData._id) {
      console.log(editData);
      setError('');
      setEdit(true);

      const result = { ...editData, amended: true };
      setLocalEditData(result);
      taskRef.current.value = result.title;
      descriptionRef.current.value = result.description;
      dateRef.current.value = result.dueDate.match(/^\d{4}\-\d{2}\-\d{2}/);
    } else {
      setEdit(false);
      setLocalEditData({});
    }
  }, [editData]);

  const validateForm = ({ title, description, dueDate }) => {
    const today = new Date();
    if (title.length < 3) return 'Task must be at least 3 characters.';
    if (title.length > 50) return 'Task cannot be more than 50 characters.';
    if (description.length < 10)
      return 'Description must be at least 10 characters.';
    if (description.length > 70)
      return 'Description cannot be more than 70 characters.';
    if (dueDate && dueDate < today) return 'Date cannot be in the past.';
    return 'valid';
  };

  const handleSubmit = () => {
    const inputs = {
      title: taskRef.current.value,
      description: descriptionRef.current.value,
      dueDate: dateRef.current.value,
      status: 'unfinished',
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

    if (edit) getFormData(localEditData, inputs);
    else getFormData(inputs);

    setEdit(false);
  };

  const cancelClicked = () => {
    taskRef.current.value = '';
    descriptionRef.current.value = '';
    dateRef.current.value = '';

    setEdit(false);
    setLocalEditData({});
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <form
        key={keyProp}
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
            className="input-group date"
          />
        </div>
        <div className="d-flex flex-d-row">
          <button type="submit" className="btn btn-primary me-2">
            {edit ? 'update' : 'add'}
          </button>
          {edit && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={cancelClicked}
            >
              Cancel
            </button>
          )}
        </div>

        {error && <p className="text-danger">{error}</p>}
      </form>
    </>
  );
};

export default TaskForm;
