import { useState } from 'react';

const LoginForm = ({ userData, login }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const validateLogin = (username, password) => {
    const user = userData.find((u) => u.username === username) || false;
    let pw;

    if (!user) {
      setFormData({ ...formData, username: '' });
      setError('Invalid username');
      setTimeout(() => setError(''), 1000);
    } else {
      pw = password === user.password ? password : false;

      if (!pw) {
        setFormData({ ...formData, password: '' });
        setError('Invalid password');
        setTimeout(() => setError(''), 1000);
      }
    }

    return user && pw ? 'valid' : 'invalid';
  };

  return (
    <>
      <div className="mb-3">
        <h3>Enter your login details</h3>
      </div>

      <form
        className="form-floating"
        onSubmit={(e) => {
          e.preventDefault();

          const validate = validateLogin(formData.username, formData.password);

          login(validate);
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
