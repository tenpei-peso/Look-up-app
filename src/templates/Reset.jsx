import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { resetPassword } from '../reducks/users/operations';
import { useDispatch } from 'react-redux';
import PrimaryButton from '../components/UIkit/PrimaryButton'
import { push } from 'connected-react-router';


const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
  });
  
  const Reset = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
      initialValues: {
        email: ''
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        dispatch(resetPassword(values.email))
      },
    });
  
    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">パスワードリセット</h2>
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
                <div className="module-spacer--small"></div>
                <PrimaryButton label={'送信'}></PrimaryButton>
                <p onClick={() => dispatch(push('/signin'))}>ログイン画面</p>
                </form>
      </div>
    );
  };
  export default Reset