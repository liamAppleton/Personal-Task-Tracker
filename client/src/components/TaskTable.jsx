import React, { useState, useEffect } from 'react';

const TaskTable = ({
  unfinishedTasks,
  finishedTasks,
  buttonClicked,
  deleteClicked,
  editClicked,
}) => {
  const [edit, setEdit] = useState({
    _id: 0,
    edit: false,
  });

  useEffect(() => {
    console.log('Unfinished tasks: ', unfinishedTasks);
  }, [unfinishedTasks]);

  const handleEditClick = (data) => {
    if (edit.edit) {
      const task = unfinishedTasks.find((t) => t._id === data._id);
      unfinishedTasks.task = { ...data, amended: true };
      setEdit({ _id: 0, edit: false });
      return;
    }

    setEdit({ _id: data._id, edit: true });
  };

  return (
    <>
      <div className="mb-3">
        <h1>To do</h1>
      </div>
      {unfinishedTasks.length > 0 ? (
        <table className="table table-info">
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Date due</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {unfinishedTasks.map((task) => {
              return (
                <tr key={task._id || task.title}>
                  <td>
                    {edit.edit && edit._id === task._id ? (
                      <input
                        className="form-control"
                        type="text"
                        placeholder={task.title}
                        onChange={(e) => {
                          task.title = e.target.value;
                        }}
                      />
                    ) : (
                      task.title
                    )}
                  </td>
                  <td>
                    {task.description ? (
                      edit.edit && edit._id === task._id ? (
                        <input
                          className="form-control"
                          type="text"
                          placeholder={task.description}
                          onChange={(e) => {
                            task.description = e.target.value;
                          }}
                        />
                      ) : (
                        task.description
                      )
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {task.dueDate ? (
                      edit.edit && edit._id === task._id ? (
                        <input
                          className="form-control"
                          type="date"
                          value={task.dueDate}
                          onChange={(e) => {
                            task.dueDate = e.target.value;
                          }}
                        />
                      ) : (
                        task.dueDate
                      )
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    <div>
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => {
                          handleEditClick(task);
                          editClicked(task);
                        }}
                      >
                        {edit.edit ? 'Update' : 'Edit'}
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          buttonClicked(task, 'done');
                        }}
                      >
                        Done
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        '✅ You’re all caught up—great job staying on top of things! 🌟'
      )}

      <div className="mb-3">
        <h1>Completed</h1>
      </div>

      {finishedTasks.length > 0 ? (
        <table className="table table-success">
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Date due</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {finishedTasks.map((task) => {
              return (
                <tr key={task._id || task.title}>
                  <td>{task.title}</td>
                  <td>{task.description && task.description}</td>
                  <td>
                    {task.dueDate && task.dueDate.match(/^\d{4}\-\d{2}\-\d{2}/)}
                  </td>
                  <td>
                    <div>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => buttonClicked(task, 'undo')}
                      >
                        Undo
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteClicked(task)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        '🚀 No tasks completed yet—let’s get started! 💪'
      )}
    </>
  );
};

export default TaskTable;
