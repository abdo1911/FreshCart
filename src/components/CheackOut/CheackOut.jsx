// import React from 'react'
// import styles from './CheackOut.module.css'
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Navigate, useLocation } from 'react-router-dom';


export default function CheackOut() {

    const [MessageResponse, setMessageResponse] = useState('');
    const [ErrorResponse, setErrorResponse] = useState('');
    let { onlinePayment, cashPayment } = useContext(CartContext);
    const [payType, setpayType] = useState('')
    let { state } = useLocation();


    function validate(values) {
        const errors = {};
        if (!values.details) {
            errors.details = 'Details is Required';
        }

        if (!values.phone) {
            errors.phone = 'Phone is Required';
        } else if (!/^(002)?01[0125][0-9]{8}$/i.test(values.phone)) {
            errors.phone = 'Invalid Phone';
        }

        if (!values.city) {
            errors.city = 'City is Required';
        }
        return errors;
    };

    async function pay(values) {
        if (payType == "Cash") {
            await cashPayment();
        } else {
            await onlinePayment(values);

        }
    }

    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        validate,
        onSubmit: (values) => {
            pay(values);
            // alert(JSON.stringify(values, null, 2));
        }
    })

    useEffect(() => {
        setpayType(state.type);
    }, [])


    return (
        <>
            <div className="w-1/2 mx-auto">
                <h1 className='text-center text-main text-lg font-extrabold'>{payType}</h1>
                <form onSubmit={formik.handleSubmit}>
                    {MessageResponse ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <p>{MessageResponse}</p>
                    </div> : ''}
                    {ErrorResponse ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <p>{ErrorResponse}</p>
                    </div> : ''}
                    <div className="my-2">
                        <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} name="details" type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formik.touched.details && formik.errors.details ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>{formik.errors.details}</p>
                        </div> : ''}
                    </div>
                    <div className="my-2">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                        <input name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formik.touched.phone && formik.errors.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>{formik.errors.phone}</p>
                        </div> : ''}
                    </div>
                    <div className="my-2">
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                        <input name="city" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formik.touched.city && formik.errors.city ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>{formik.errors.city}</p>
                        </div> : ''}
                    </div>
                    <div className="my-4 text-end">
                        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className="bg-main text-white px-4 py-2 rounded-lg">Pay Now</button>
                    </div>
                </form>
            </div>
        </>
    )
}
