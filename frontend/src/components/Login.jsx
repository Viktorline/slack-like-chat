import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(40, 'Username must be at most 40 characters'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password must be at most 50 characters'),
    }),

    onSubmit: () => console.log('submit'),
  });

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 mx-10">
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
            placeholder="Login"
            id="username"
            isInvalid={formik.touched.username && !!formik.errors.username}
          />
          <Form.Label htmlFor="username">Login</Form.Label>
          <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
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
            isInvalid={formik.touched.password && !!formik.errors.password}
          />
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!formik.isValid}
          type="submit"
          variant="outline-primary"
          className="w-100 mb-3"
        >
          Submit
        </Button>
      </Form>
      <Link to="/">to Home Page</Link>
    </div>
  );
};

export default Login;
