// import React from 'react'
// import styles from './Brands.module.css'

import { useDispatch, useSelector } from "react-redux"
import { getBrands, /*increament*/ } from "../../Redux/ProductSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function Brands() {

    let dispatch = useDispatch()
    // let { counter } = useSelector((state) => state.producRed);
    // console.log(counter);
    let { brands } = useSelector((state) => state.producRed);
    console.log(brands);

    const [isLoading, setisLoading] = useState(true)

    async function getData() {
        await dispatch(getBrands())

    }

    useEffect(() => {
        getData();
        setisLoading(false);
    }, [])


    return (
        <div className="container text-center mx-auto my-8">
            {/* <div>{counter}</div>
            <button onClick={() => dispatch(increament())}>+</button> */}
            {isLoading ? <Loader /> : <div className="flex flex-wrap">
                {brands.map((brand) => <div key={brand._id} className="sm:w-full md:w-1/4 lg:w-1/6">
                    <div className="product px-2 py-3">

                        <Link to={`/BrandDetails/${brand._id}`}>
                            <img src={brand.image} className="w-[200px] h-[250px]" alt="" />
                            <h3 className="text-main text-lg">{brand.name}</h3>
                        </Link>
                    </div>
                </div>)}
            </div>}
        </div>
    )
}
