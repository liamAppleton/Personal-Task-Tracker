import React, { useEffect, useState } from 'react';

const TaskTable = ({
  unfinishedTasks,
  finishedTasks,
  buttonClicked,
  deleteClicked,
  handleUpdate,
}) => {
  const [unfinTasks, setUnfinTasks] = useState([{}]);
  const [edit, setEdit] = useState({
    _id: 0,
    edit: false,
  });

  const handleKeyDown = (data) => {
    handleUpdate(data);

    setEdit({ _id: 0, edit: false, key: '' });
  };

  useEffect(() => {
    setUnfinTasks(unfinishedTasks);
  }, [unfinishedTasks]);

  return (
    <>
      <div className="mb-3">
        <h1>To do</h1>
      </div>
      {unfinTasks.length > 0 ? (
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
            {unfinTasks.map((task) => {
              return (
                <tr key={task._id || task.title}>
                  <td
                    onClick={() => {
                      setEdit({ _id: task.id, edit: true, key: task.title });
                    }}
                  >
                    {edit.edit &&
                    edit._id === task._id &&
                    edit.key === task.title ? (
                      <input
                        className="form-control"
                        type="text"
                        placeholder={task.title}
                        onChange={(e) => {
                          task.title = e.target.value;
                        }}
                        onKeyDown={(e) =>
                          e.key === 'Enter' &&
                          handleKeyDown({
                            updated: { title: task.title },
                            _id: task.id,
                          })
                        }
                      />
                    ) : (
                      task.title
                    )}
                  </td>
                  <td
                    onClick={() => {
                      setEdit({
                        _id: task.id,
                        edit: true,
                        key: task.description,
                      });
                    }}
                  >
                    {edit.edit &&
                    edit._id === task._id &&
                    edit.key === task.description ? (
                      <input
                        className="form-control"
                        type="text"
                        placeholder={task.description}
                        onChange={(e) => {
                          task.description = e.target.value;
                        }}
                        onKeyDown={(e) =>
                          e.key === 'Enter' &&
                          handleKeyDown({
                            updated: { description: task.description },
                            _id: task.id,
                          })
                        }
                      />
                    ) : (
                      task.description
                    )}
                  </td>
                  <td
                    onClick={() => {
                      setEdit({ _id: task.id, edit: true, key: task.dueDate });
                    }}
                  >
                    {edit.edit &&
                    edit._id === task._id &&
                    edit.key === task.dueDate ? (
                      <input
                        className="form-control"
                        type="date"
                        value={task.dueDate}
                        onChange={(e) => {
                          task.dueDate = e.target.value;
                          handleKeyDown({
                            updated: { dueDate: task.dueDate },
                            _id: task.id,
                          });
                        }}
                      />
                    ) : (
                      task.dueDate
                    )}
                  </td>
                  <td>
                    <div>
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
