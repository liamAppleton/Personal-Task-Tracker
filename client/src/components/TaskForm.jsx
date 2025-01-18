import { useRef } from 'react';

const TaskForm = () => {
  const taskRef = useRef(null);
  const descriptionRef = useRef(null);

  const validateForm = ({ task, description }) => {
    if (task.length < 3) return 'Task must be at least 3 characters.';
    if (task.length > 3) return 'Task cannot be more than 50 characters.';
    if (description.length < 10)
      return 'Description must be at least 10 characters.';
    if (description.length > 70)
      return 'Description cannot be more than 70 characters.';
    return 'valid';
  };

  const handleSubmit = () => {
    const inputs = {
      task: taskRef.current.value,
      description: descriptionRef.current.value,
    };
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
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </>
  );
};

export default TaskForm;
