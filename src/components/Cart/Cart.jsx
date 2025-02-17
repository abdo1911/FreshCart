// import React from 'react'
// import styles from './Cart.module.css'

import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../Context/CartContext"
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";


export default function Cart() {

    const [cartItems, setCartItems] = useState([])
    const [isLoading, setisLoading] = useState(true);

    let { getCart, removeCatItem, updateCarItem, deleteAllCart, totalPrice } = useContext(CartContext);

    async function getAllCart() {
        let response = await getCart();
        setCartItems(response.data.data.products)
        setisLoading(false)

    }

    async function removeCartItem(productId) {
        let response = await removeCatItem(productId);
        setCartItems(response.data.data.products)

    }

    async function updateProduct(productId, count) {
        let response = await updateCarItem(productId, count);
        setCartItems(response.data.data.products)


    }
    async function deleteAll() {
        let response = await deleteAllCart();
        console.log(response);

        setCartItems([])

    }

    useEffect(() => {
        getAllCart()
    }, [])


    return (
        <>
            {isLoading ? <Loader /> :
                <div className="relative container mx-auto overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-16 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Qty
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Unit Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                    <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {item.product.title}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <button onClick={() => updateProduct(item.product.id, item.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                            </svg>
                                        </button>
                                        <div>
                                            <span>{item.count}</span>
                                        </div>
                                        <button onClick={() => updateProduct(item.product.id, item.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {item.price} EGP
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {item.price * item.count} EGP
                                </td>
                                <td className="px-6 py-4">
                                    <a onClick={() => removeCartItem(item.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                </td>
                            </tr>
                            )}
                            <tr className="bg-white text-center font-extrabold border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="font-extrabold text-black text-xl py-5">Total Price</td>
                                <td className="font-bold py-5 text-black text-xl" colSpan="3">{totalPrice} EGP</td>
                                <td className="font-bold py-5 text-black text-xl" colSpan="1"><Link className="px-3 py-2 bg-main text-white rounded"
                                    to="/checkout" state={{ type: "Online" }}>Online</Link></td>
                                <td className="font-bold py-5 text-black text-xl" colSpan="1"><Link className="px-3 py-2 bg-main text-white rounded"
                                    to="/checkout" state={{ type: "Cash" }}>Cash</Link>
                                </td>
                                <td className="font-bold py-5 text-black text-xl" colSpan="1">
                                    <button className="bg-red-700 text-white px-3 py-2 rounded-xl my-3" onClick={() => deleteAll()}>Clear Cart</button>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }

        </>
    )
}
