import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const Login = () => {
  const { logIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        .required(t('yupValidation.userRequired'))
        .min(3, t('inputRequirements'))
        .max(20, t('inputRequirements')),
      password: Yup.string()
        .trim()
        .required(t('yupValidation.passwordRequired'))
        .min(5, t('passwordRequirements'))
        .max(20, t('inputRequirements')),
    }),

    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        logIn(data);
        localStorage.setItem('user', JSON.stringify(data));
        console.log(data);
        navigate('/');
      } catch (err) {
        console.log(err);
        if (err.isAxiosError) {
          if (err.response.status === 401) {
            setAuthFailed(true);
            inputRef.current.select();
          } else {
            toast.error(t('errors.network'));
          }
        } else {
          toast.error(t('errors.unknown'));
          throw err;
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('loginPage.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    name="username"
                    autoComplete="username"
                    required=""
                    placeholder={t('username')}
                    id="username"
                    isInvalid={(formik.touched.username && !!formik.errors.username) || authFailed}
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">{t('loginPage.username')}</Form.Label>
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
                    placeholder={t('password')}
                    type="password"
                    id="password"
                    isInvalid={(formik.touched.password && !!formik.errors.password) || authFailed}
                  />
                  <Form.Label htmlFor="password">{t('password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  {authFailed && (
                    <Form.Control.Feedback type="invalid" tooltip placement="right">
                      {t('loginPage.authFailed')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button
                  disabled={!formik.isValid}
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  {t('loginPage.submit')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <a href="/signup">{t('loginPage.registration')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
