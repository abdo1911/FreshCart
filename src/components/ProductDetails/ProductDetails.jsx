// import React from 'react'
// import styles from './ProductDetails.module.css'

import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";



export default function ProductDetails() {

    let { id, category } = useParams();

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const [productdeTails, setproductdeTails] = useState({});
    const [AllproductdeTails, setAllproductdeTails] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    async function GetPrdouctDetails() {

        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((data) => {
            setproductdeTails(data.data.data);
            setisLoading(false)
        }).catch((error) => {
            console.log(error);
            setisLoading(false)

        })

    }

    async function GetAllPrdouctDetails() {

        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((data) => {
            let relatedProducts = data.data.data;
            relatedProducts = relatedProducts.filter((prod) => prod.category.name == category)
            setAllproductdeTails(relatedProducts);
            console.log(relatedProducts);

        }).catch((error) => {
            console.log(error);
        })

    }

    useEffect(() => {
        GetPrdouctDetails()
        GetAllPrdouctDetails();
    }, [])

    useEffect(() => {
        GetPrdouctDetails()
    }, [id])

    let { addToCart } = useContext(CartContext);

    async function addProductToCart(productId) {
        let response = await addToCart(productId);
        console.log(response);

    }

    return (
        <>
            {isLoading ? <Loader /> :
                <div className="container mx-auto mt-20 ">
                    <div className="flex">
                        <div className="w-1/4 mb-20">
                            <Slider {...settings}>
                                {productdeTails?.images?.map((src) => <img key={id} src={src} alt="" />)}
                            </Slider>
                        </div>
                        <div className="w-3/4 mt-10">
                            <h1 className="text-black font-bolder text-2xl my-5">{productdeTails.title}</h1>
                            <h1 className="text-gray-700 font-bolder text-2xl my-5">{productdeTails.description}</h1>
                            <p className="my-5">{productdeTails.category?.name}</p>
                            <div className="flex justify-between align-center my-5">
                                <div>{productdeTails.price} EGP</div>
                                <div><i className="fa fa-star rating-color"></i>{productdeTails.ratingsAverage}</div>
                            </div>
                            <div className="button w-full">
                                <button onClick={() => addProductToCart(productdeTails._id)} className="bg-main w-full btn rounded-lg text-white px-3 py-2 mt-4">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                    <h1>Related Products :</h1>

                    <div className="flex flex-wrap">
                        {AllproductdeTails?.map((product) => <div key={product._id} className="sm:w-full md:w-1/4 lg:w-1/6">
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
                                    <button onClick={() => addProductToCart(product._id)} className="bg-main w-full btn rounded-lg text-white px-3 py-2 mt-4">Add To Cart</button>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>

            }
        </>
    )
}
