// import React from 'react'
// import styles from './MainSlider.module.css'
import slider1 from "./../../assets/grocery-banner-2.jpeg"
import slider2 from "./../../assets/grocery-banner.png"
import slider3 from "./../../assets/slider-image-1.jpeg"
import slider4 from "./../../assets/slider-image-2.jpeg"
import slider5 from "./../../assets/slider-image-3.jpeg"
import Slider from "react-slick";


export default function MainSlider() {


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };



    return (
        <>
            <div className="container mx-auto my-10">
                <div className="flex">
                    <div className="w-3/4 ">
                        <Slider {...settings}>
                            <img className="h-[300px]" src={slider3} alt="" />
                            <img className="h-[300px]" src={slider4} alt="" />
                            <img className="h-[300px]" src={slider5} alt="" />
                        </Slider>
                    </div>
                    <div className="w-1/4">
                        <img className="h-[150px]" src={slider1} alt="" />
                        <img className="h-[150px]" src={slider2} alt="" />

                    </div>

                </div>
            </div>

        </>)
}
