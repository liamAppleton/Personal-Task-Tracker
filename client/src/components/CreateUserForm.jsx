import React, { useState } from 'react';
import styles from './createUserForm.module.css';

const CreateUserForm = ({ newUser, accountCreation }) => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const validateLogin = ({ username, password, confirmPassword }) => {
    if (username.length < 3 || username.length > 15)
      return 'Username must be between 3 and 15 characters.';
    if (password.length < 8 || password.length > 20)
      return 'Password must be between 8 and 20 characters.';
    if (confirmPassword !== password) return 'Passwords do not match.';

    return 'valid';
  };

  const handleSubmit = (formData) => {
    const validate = validateLogin(formData);
    if (validate !== 'valid') {
      setError(validate);
      setTimeout(() => setError(''), 1000);
      return;
    }
    const createdUser = {
      username: formData.username,
      password: formData.password,
    };
    newUser(createdUser);
  };

  return (
    <>
      <div className="mb-3">
        <h3>Create account</h3>
      </div>
      <div className="mb-3">
        <form
          className="form-floating"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formData);
            accountCreation(false);
          }}
        >
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Enter a username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <label htmlFor="floatingInput">Enter a username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Enter a password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <label htmlFor="floatingPassword">Enter a password</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword2"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <label htmlFor="floatingPassword2">Confirm password</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Create account
          </button>
        </form>
      </div>
      {error && (
        <div className="mb-3">
          <p className="text-danger">{error}</p>
        </div>
      )}

      <p onClick={() => accountCreation(false)} className={styles.backLink}>
        Back to login
      </p>
    </>
  );
};

export default CreateUserForm;
