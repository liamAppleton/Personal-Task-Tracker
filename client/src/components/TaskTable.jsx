import React from 'react';

const TaskTable = ({
  unfinishedTasks,
  finishedTasks,
  buttonClicked,
  deleteClicked,
  editClicked,
}) => {
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
                  <td>{task.title}</td>
                  <td>{task.description && task.description}</td>
                  <td>
                    {task.dueDate && task.dueDate.match(/^\d{4}\-\d{2}\-\d{2}/)}
                  </td>
                  <td>
                    <div>
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => editClicked(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => buttonClicked(task, 'done')}
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
