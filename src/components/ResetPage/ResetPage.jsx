// import React from 'react'
// import styles from './ResetPage.module.css'
import { useFormik } from 'formik';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ResetPage() {
    const [MessageResponse, setMessageResponse] = useState('')
    const [ErrorResponse, setErrorResponse] = useState('')
    const [Loader, setLoader] = useState(false)
    let navigate = useNavigate()




    function validate(values) {
        const errors = {};


        if (!values.newPassword) {
            errors.newPassword = 'Password is Required';
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
            newPassword: ""
        },
        validate,
        onSubmit: (values) => {
            LoginForm(values)
            // alert(JSON.stringify(values, null, 2));
        }
    })
    async function LoginForm(values) {
        setLoader(true);
        return await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values).then((data) => {
            setMessageResponse(data.data.message)
            setErrorResponse('');
            setLoader(false);
            navigate('/');


        }
        ).catch((err) => {
            setErrorResponse(err.response.data.message)
            setMessageResponse('')
            setLoader(false);
        });
    }

    return (
        <>
            <div className="w-1/2 mx-auto">
                <h1 className="text-main text-3xl">New Password</h1>
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
                        <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                        <input name="newPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} type="newPassword" id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formik.touched.newPassword && formik.errors.newPassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>{formik.errors.newPassword}</p>
                        </div> : ''}
                    </div>
                    <div className="my-4 text-end">
                        {Loader ? <button type='submit' className="bg-main text-white px-4 py-2 rounded-lg"><i className='fa fa-spin fa-spinner'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className="bg-main text-white px-4 py-2 rounded-lg">Submit</button>}
                    </div>

                </form>
            </div>
        </>
    )
}
