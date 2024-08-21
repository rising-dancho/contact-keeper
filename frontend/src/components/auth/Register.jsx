import React, { useContext, useEffect, useState } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // Alert
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // Auth
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = user;

  useEffect(() => {
    if (isAuthenticated) {
      setAlert('Registration successful!', 'success');
      setUser({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      navigate('/');
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, navigate]);

  function onChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      setAlert('Please enter all fields.', 'danger');
    } else if (password !== confirmPassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            // required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            // required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
