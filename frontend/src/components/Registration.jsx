import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const RegistrationPage = () => {
  const auth = useAuth();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .required(t('yupValidation.userRequired'))
      .min(3, t('yupValidation.userMin'))
      .max(40, t('yupValidation.userMax')),
    password: Yup.string()
      .trim()
      .required(t('yupValidation.passwordRequired'))
      .min(5, t('yupValidation.passwordMin'))
      .max(50, t('yupValidation.passwordMax')),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], t('yupValidation.mustMatch')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setRegistrationFailed(false);
      try {
        const response = await axios.post(routes.registrationPath(), {
          username: values.username,
          password: values.password,
        });
        console.log(response.data);
        auth.logIn(response.data);
        navigate('/');
      } catch (err) {
        if (err.response.status === 409) {
          setRegistrationFailed(true);
          inputRef.current.select();
        }
        console.log(err);
        throw err;
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
                <h1 className="text-center mb-4">{t('registrationPage.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder={
                      `${t('registrationPage.userMin')} ${t('registrationPage.userMax')}`
                    }
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={
                      (formik.errors.username && formik.touched.username) || registrationFailed
                    }
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">{t('username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder={
                      `${t('registrationPage.passwordMin')} ${t('registrationPage.passwordMax')}`
                    }
                    name="password"
                    id="password"
                    aria-describedby="passwordHelpBlock"
                    isInvalid={
                      (formik.errors.password && formik.touched.password) || registrationFailed
                    }
                    required
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="password">{t('password')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    placeholder={t('yupValidation.mustMatch')}
                    name="confirmPassword"
                    id="confirmPassword"
                    isInvalid={
                      (formik.errors.confirmPassword && formik.touched.confirmPassword)
                      || registrationFailed
                    }
                    required
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {registrationFailed
                      ? t('registrationPage.alreadyExists')
                      : formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="confirmPassword">{t('registrationPage.confirm')}</Form.Label>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100">
                  {t('registrationPage.register')}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
