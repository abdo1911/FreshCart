// import React from 'react'
// import styles from './FeatureProducts.module.css'

import axios from "axios"
// import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom"; 
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

export default function FeatureProducts() {

    // const [products, setproducts] = useState([])
    // const [isLoading, setisLoading] = useState(true)

    // async function GetPrdoucts() {

    //     return await axios.get("https://ecommerce.routemisr.com/api/v1/products").then((data) => {
    //         console.log(data.data.data);
    //         setproducts(data.data.data);
    //         setisLoading(false)
    //     }).catch((error) => {
    //         console.log(error);
    //         setisLoading(false)

    //     })

    // }

    // useEffect(() => {
    //     GetPrdoucts()
    // }, [])

    function getFeatureProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }

    let { data, isError, isLoading, error } = useQuery({
        queryKey: ["featureProducts"],
        queryFn: getFeatureProducts,
        staleTime: 5000,
        retry: 3,
        // refetchInterval: 3000,
    })

    let {addToCart} = useContext(CartContext);

    async function addProductToCart(productId) {
        let response = await addToCart(productId);
        console.log(response);
        
    }

    return (
        <div className="container mx-auto">
            {/* {isLoading ? <Loader /> : <div className="flex flex-wrap">
                {products.map((product) => <div key={product._id} className="sm:w-full md:w-1/4 lg:w-1/6">
                    <div className="product px-2 py-3">
                        <img src={product.imageCover} className="w-[200px] h-[250px]" alt="" />
                        <h3 className="text-main text-lg">{product.category.name}</h3>
                        <p className="text-sm">{product.title.split(" ").slice(0, 2).join(" ")}</p>
                        <div className="flex justify-between align-center">
                            <div>{product.price} EGP</div>
                            <div><i className="fa fa-star rating-color"></i>{product.ratingsAverage}</div>
                        </div>
                        <div className="button">
                            <button className="bg-main w-full btn rounded-lg text-white px-3 py-2 mt-4">Add To Cart</button>
                        </div>
                    </div>
                </div>)}
            </div>} */}

            {isError ? <p>{error.message}</p> : ''}
            {isLoading ? <Loader /> : <div className="flex flex-wrap">
                {data?.data?.data.map((product) => <div key={product._id} className="sm:w-full md:w-1/4 lg:w-1/6">
                    <div className="product px-2 py-3">

                        <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
                            <img src={product.imageCover} className="w-[200px] h-[250px]" alt="" />
                            <h3 className="text-main text-lg">{product.category.name}</h3>
                            <p className="text-sm">{product.title.split(" ").slice(0, 2).join(" ")}</p>
                            <div className="flex justify-between align-center">
                                <div>{product.price} EGP</div>
                                <div><i className="fa fa-star rating-color"></i>{product.ratingsAverage}</div>
                            </div>
                        </Link>

                        <div className="button">
                            <button onClick={()=>addProductToCart(product._id)} className="bg-main w-full btn rounded-lg text-white px-3 py-2 mt-4">Add To Cart</button>
                        </div>
                    </div>
                </div>)}
            </div>}

        </div>
    )
}
