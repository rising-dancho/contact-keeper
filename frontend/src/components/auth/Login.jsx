import React, { useContext, useState } from 'react';
import AlertContext from '../context/alert/alertContext';

const Login = () => {
  const alertContext = useContext(AlertContext);
  const { alerts, setAlert } = alertContext;
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  function onChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please enter all fields.', 'danger');
    } else {
      setAlert(`Login successful!`, 'success');
    }
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
