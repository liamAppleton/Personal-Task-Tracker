import React from 'react';

const TaskTable = ({ unfinishedTasks, finishedTasks }) => {
  return (
    <>
      <div className="mb-3">
        <h1>To do</h1>
      </div>
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
                    <button className="btn btn-success me-2">Done</button>
                    <button className="btn btn-secondary">Edit</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mb-3">
        <h1>Completed</h1>
      </div>

      {finishedTasks.length > 1 ? (
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
            {finishedTasks.slice(1).map((task) => {
              return (
                <tr key={task._id || task.title}>
                  <td>{task.title}</td>
                  <td>{task.description && task.description}</td>
                  <td>
                    {task.dueDate && task.dueDate.match(/^\d{4}\-\d{2}\-\d{2}/)}
                  </td>
                  <td>
                    <div>
                      <button className="btn btn-warning me-2">Undo</button>
                      <button className="btn btn-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        'Chillax bro, nothing to do 🧉'
      )}
    </>
  );
};

export default TaskTable;
