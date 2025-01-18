import React, { useEffect } from 'react';

const TaskTable = ({ backendData }) => {
  useEffect(() => {
    console.log(backendData);
  }, [backendData]);

  return (
    <>
      <table className="table table-primary">
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
              <tr>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.dueDate.match(/^\d{4}\-\d{2}\-\d{2}/)}</td>
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
