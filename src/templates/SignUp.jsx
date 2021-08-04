import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { signUp } from '../reducks/users/operations';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import AutoComplete from '../components/UIkit/AutoComplete';

const validationSchema = yup.object({
    username: yup
        .string('名前を入力してください')
        .required('名前が必要です'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required')
});

const SignUp = () => {
    const [locate, setLocate] = useState('');
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
            
    },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        dispatch(signUp(values.username, values.email, values.password, locate))
      },
    });
  
    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">登録</h2>
            <div className="module-spacer--small"></div>
            <AutoComplete setLocate={setLocate}></AutoComplete>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth={true}
                        id="username"
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        fullWidth={true}
                        id="email1"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth={true}
                        id="password1"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                <div className="module-spacer--small"></div>
                <Button variant="contained" color="primary" fullWidth type="submit">登録</Button>
                </form>
        </div>
    );
};
export default SignUp
