import React, { useEffect, useState } from 'react';
import { validateTableUpdate } from '../utils/utils';

const TaskTable = ({
  unfinishedTasks,
  finishedTasks,
  buttonClicked,
  deleteClicked,
  handleUpdate,
}) => {
  const [unfinTasks, setUnfinTasks] = useState([{}]);
  const [edit, setEdit] = useState({ _id: 0, edit: false });
  const [error, setError] = useState('');

  const handleKeyDown = (data) => {
    handleUpdate(data);

    setEdit({ _id: 0, edit: false, key: '', value: '' });
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
                      <form className="form-floating">
                        <input
                          id={
                            error
                              ? 'floatingInputInvalid'
                              : 'floatingInputValue'
                          }
                          className={
                            error ? 'form-control is-invalid' : 'form-control'
                          }
                          type="text"
                          onKeyDown={(e) => {
                            const currentValue = e.target.value;

                            if (
                              e.key === 'Enter' &&
                              validateTableUpdate({ title: currentValue }) ===
                                'valid'
                            ) {
                              handleKeyDown({
                                updated: { title: currentValue },
                                _id: task.id,
                              });
                              setError('');
                              e.preventDefault();
                            } else if (e.key === 'Enter') {
                              setError(
                                validateTableUpdate({ title: currentValue })
                              );
                              e.preventDefault();
                            }
                          }}
                        />
                        <label
                          htmlFor={
                            error
                              ? 'floatingInputInvalid'
                              : 'floatingInputValue'
                          }
                        >
                          {error ? 'Invalid input' : 'Edit task'}
                        </label>
                      </form>
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
                      <form className="form-floating">
                        <input
                          id={
                            error
                              ? 'floatingInputInvalid'
                              : 'floatingInputValue'
                          }
                          className={
                            error ? 'form-control is-invalid' : 'form-control'
                          }
                          type="text"
                          onKeyDown={(e) => {
                            const currentValue = e.target.value;

                            if (
                              e.key === 'Enter' &&
                              validateTableUpdate({
                                description: currentValue,
                              }) === 'valid'
                            ) {
                              handleKeyDown({
                                updated: { description: currentValue },
                                _id: task.id,
                              });
                              setError('');
                              e.preventDefault();
                            } else if (e.key === 'Enter') {
                              setError(
                                validateTableUpdate({
                                  description: currentValue,
                                })
                              );
                              e.preventDefault();
                            }
                          }}
                        />
                        <label
                          htmlFor={
                            error
                              ? 'floatingInputInvalid'
                              : 'floatingInputValue'
                          }
                        >
                          {error ? 'Invalid input' : 'Edit description'}
                        </label>
                      </form>
                    ) : (
                      task.description
                    )}
                  </td>
                  <td
                    onClick={() => {
                      setEdit({ _id: task.id, edit: true, key: task.dueDate });
                    }}
                    className={
                      new Date(task.dueDate).setHours(0, 0, 0, 0) <
                      new Date().setHours(0, 0, 0, 0)
                        ? 'text-danger'
                        : 'text'
                    }
                  >
                    {edit.edit &&
                    edit._id === task._id &&
                    edit.key === task.dueDate ? (
                      <input
                        className="form-control"
                        type="date"
                        value={task.dueDate}
                        min={new Date().toISOString().split('T')[0]}
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
