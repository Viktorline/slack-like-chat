import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useAuth } from '../hooks/index.js';

import routes from '../routes.js';

const Login = () => {
  const { logIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .trim()
        .required('Username is required')
        .min(3, '3 symbols min')
        .max(40, '40 symbols max'),
      password: Yup.string()
        .trim()
        .required('Password is required')
        .min(5, 'Password 5 symbols min')
        .max(50, 'Password 50 symbols max'),
    }),

    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        logIn(data);
        localStorage.setItem('user', JSON.stringify(data));
        console.log(data);
        navigate('/');
      } catch (err) {
        setAuthFailed(true);
        inputRef.current.select();
        console.log(err);
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Login Page</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    name="username"
                    autoComplete="username"
                    required=""
                    placeholder="Username"
                    id="username"
                    isInvalid={(formik.touched.username && !!formik.errors.username) || authFailed}
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">Username</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    name="password"
                    autoComplete="current-password"
                    required=""
                    placeholder="Password"
                    type="password"
                    id="password"
                    isInvalid={(formik.touched.password && !!formik.errors.password) || authFailed}
                  />
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  {authFailed && (
                    <Form.Control.Feedback type="invalid" tooltip placement="right">
                      Invalid username or password
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button
                  disabled={!formik.isValid}
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  Submit
                </Button>
                <div>
                  <div className="text-center">
                    <a href="/registration">Registration</a>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
