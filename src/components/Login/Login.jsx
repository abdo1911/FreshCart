// import React from 'react'
// import styles from './Login.module.css'
import { useFormik } from 'formik';
import axios from 'axios'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../TokenContext';
import { useContext } from 'react'



export default function Login() {
    let { token, settoken } = useContext(TokenContext);
    const [MessageResponse, setMessageResponse] = useState('')
    const [ErrorResponse, setErrorResponse] = useState('')
    const [Loader, setLoader] = useState(false)
    let navigate = useNavigate()

    function forget() {
        window.location.href = "forget"
    }


    function validate(values) {
        const errors = {};


        if (!values.password) {
            errors.password = 'Password is Required';
        }
        // else if (!/^[A-Z][a-z0-9]{3,8}$/.test(values.password)) {
        //     errors.password = 'Invalid Password';
        // }


        if (!values.email) {
            errors.email = 'Email is Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }


        return errors;
    };

    let formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate,
        onSubmit: (values) => {
            LoginForm(values)
            // alert(JSON.stringify(values, null, 2));
        }
    })
    async function LoginForm(values) {
        setLoader(true);
        return await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then((data) => {
            setMessageResponse(data.data.message)
            localStorage.setItem("userToken", data.data.token);
            settoken(data.data.token)
            setErrorResponse('');
            setLoader(false);
            navigate('/');


        }
        ).catch((err) => {
            setErrorResponse(err.response.data.message)
            setMessageResponse('')
            setLoader(false);

        });
        // console.log(data)
    }

    return (
        <>
            <div className="w-1/2 mx-auto">
                <h1 className="text-main text-3xl">Login</h1>
                <br></br>
                <form onSubmit={formik.handleSubmit}>
                    {MessageResponse ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <p>{MessageResponse}</p>
                    </div> : ''}
                    {ErrorResponse ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <p>{ErrorResponse}</p>
                    </div> : ''}
                    <div className="my-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formik.touched.email && formik.errors.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>{formik.errors.email}</p>
                        </div> : ''}
                    </div>
                    <div className="my-2">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formik.touched.password && formik.errors.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>{formik.errors.password}</p>
                        </div> : ''}
                    </div>
                    <div className="my-4 text-end">
                        {<Link onClick={() => { forget() }} className="bg-emerald-600 text-white px-4 mr-2 py-2 rounded-lg">Forget Password</Link>}
                        {Loader ? <button type='submit' className="bg-main text-white px-4 py-2 rounded-lg"><i className='fa fa-spin fa-spinner'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className="bg-main text-white px-4 py-2 rounded-lg">Login</button>}
                    </div>

                </form>
            </div>
        </>
    )
}
