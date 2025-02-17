// import React from 'react'
// import styles from './Register.module.css'
import { useFormik } from 'formik';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Register() {
    const [MessageResponse, setMessageResponse] = useState('')
    const [ErrorResponse, setErrorResponse] = useState('')
    const [Loader, setLoader] = useState(false)
    let navigate = useNavigate()
    function validate(values) {
        const errors = {};

        if (!values.name) {
            errors.name = 'Name is Required';
        } else if (values.name.length < 3) {
            errors.name = 'Must be Greather than 15 characters ';
        }


        if (!values.password) {
            errors.password = 'Password is Required';
        } else if (!/^[A-Z][a-z0-9]{3,8}$/.test(values.password)) {
            errors.password = 'Invalid Password';
        }

        if (!values.rePassword) {
            errors.rePassword = 'RePassword is Required';
        } else if (values.rePassword != values.password) {
            errors.rePassword = 'Password not Match';
        }

        if (!values.email) {
            errors.email = 'Email is Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.phone) {
            errors.phone = 'Phone is Required';
        } else if (!/^(002)?01[0125][0-9]{8}$/i.test(values.phone)) {
            errors.phone = 'Invalid Phone';
        }

        return errors;
    };


    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        validate,
        onSubmit: (values) => {
            registerForm(values)
            // alert(JSON.stringify(values, null, 2));
        }
    })
    async function registerForm(values) {
        setLoader(true);
        return await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then((data) => {
            setMessageResponse(data.data.message)
            setErrorResponse('');
            setLoader(false);
            navigate('/login');


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
                <h1 className="text-main text-3xl">Register</h1>
                <form onSubmit={formik.handleSubmit}>
                    {MessageResponse ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <p>{MessageResponse}</p>
                    </div> : ''}
                    {ErrorResponse ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <p>{ErrorResponse}</p>
                    </div> : ''}
                    <div className="my-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} name="name" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formik.touched.name && formik.errors.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>{formik.errors.name}</p>
                        </div> : ''}
                    </div>
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
                    <div className="my-2">
                        <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RePassword</label>
                        <input name="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formik.touched.rePassword && formik.errors.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>{formik.errors.rePassword}</p>
                        </div> : ''}
                    </div>
                    <div className="my-2">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                        <input name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formik.touched.phone && formik.errors.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>{formik.errors.phone}</p>
                        </div> : ''}
                    </div>
                    <div className="my-4 text-end">
                        {Loader ? <button type='submit' className="bg-main text-white px-4 py-2 rounded-lg"><i className='fa fa-spin fa-spinner'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className="bg-main text-white px-4 py-2 rounded-lg">Register</button>}
                    </div>
                </form>
            </div>

        </>
    )
}
