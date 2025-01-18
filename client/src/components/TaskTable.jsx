import React, { useEffect } from 'react';

const TaskTable = ({ backendData }) => {
  return (
    <>
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
          {backendData.map((task) => {
            return (
              <tr key={task._id || task.title}>
                <td>{task.title}</td>
                <td>{task.description && task.description}</td>
                <td>
                  {task.dueDate && task.dueDate.match(/^\d{4}\-\d{2}\-\d{2}/)}
                </td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TaskTable;
