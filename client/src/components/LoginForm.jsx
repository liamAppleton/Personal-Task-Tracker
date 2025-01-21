import React from 'react';

const LoginForm = () => {
  return (
    <>
      <div className="mb-3">
        <h3>Enter your login details</h3>
      </div>

      <form className="form-floating">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Username"
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingInput">Password</label>
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
