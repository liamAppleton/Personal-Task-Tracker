const TaskForm = () => {
  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="task" className="form-label">
            Task:{' '}
          </label>
          <input name="task" type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:{' '}
          </label>
          <input name="description" type="text" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </>
  );
};

export default TaskForm;
