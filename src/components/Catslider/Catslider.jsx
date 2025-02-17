// import React from 'react'
// import styles from './Catslider.module.css'

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Slider from "react-slick";


export default function Catslider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    function getCatSlider() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }

    let { data } = useQuery({
        queryKey: "CatigorySlider",
        queryFn: getCatSlider,
    })
    console.log(data?.data?.data);


    return (
        <>
            <div className="container mx-auto my-10">
                <h1 className="font-bold my-10">Show Popular Categories</h1>
                <Slider {...settings}>
                    {data?.data?.data.map((cat) => <div key={1} className="text-center">
                        <img className="h-[200px]" src={cat.image} alt="" />
                        <p>{cat.name}</p>

                    </div>)}
                </Slider>
            </div>

        </>
    )
}
