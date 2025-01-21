import { useEffect, useState } from 'react';

const LoginForm = ({ userData }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Login form: ', userData);
  }, [userData]);

  const validateLogin = ({ username, password }) => {
    let index;
    for (let user of userData) {
      if (user.username === username) {
        index = userData.indexOf(user);
      }
    }

    if (userData[index].password !== password) {
      setError('Invalid password');
      return;
    }

    setError('');
    return 'valid';
  };

  const handleSubmit = (e) => {};

  return (
    <>
      <div className="mb-3">
        <h3>Enter your login details</h3>
      </div>

      <form
        className="form-floating"
        onSubmit={(e) => {
          const validation = validateLogin(formData);
          if (validation !== 'valid') {
            e.preventDefault();
          }
        }}
      >
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => {
              const updatedUserName = e.target.value;
              setFormData({ ...formData, username: updatedUserName });
            }}
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => {
              const updatedPassword = e.target.value;
              setFormData({ ...formData, password: updatedPassword });
            }}
          />
          <label htmlFor="floatingInput">Password</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      {error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default LoginForm;
