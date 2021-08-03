import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { signIn } from '../reducks/users/operations';
import { useDispatch } from 'react-redux';
// import PrimaryButton from '../components/UIkit/PrimaryButton'
import { push } from 'connected-react-router';
import { Button } from '@material-ui/core';


const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });
  
  const SignIn = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        dispatch(signIn(values.email, values.password))
      },
    });
  
    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">サインイン</h2>
            <div className="module-spacer--small"></div>
                <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth={true}
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth={true}
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <div className="module-spacer--small"></div>
                <Button variant="contained" color="primary" fullWidth type="submit">ログイン</Button>
                <p onClick={() => dispatch(push('/signup'))}>アカウント登録はこちら</p>
                <p onClick={() => dispatch(push('/signin/reset'))}>パスワードを忘れた方はこちら</p>
                </form>
      </div>
    );
  };
  export default SignIn