// import React from 'react'
// import styles from './Categories.module.css'

import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export default function Categories() {


    const [categories, setcategories] = useState([])
    const [isLoading, setisLoading] = useState(true)

    async function GetCategories() {

        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((data) => {
            console.log(data.data.data);
            setcategories(data.data.data);
            setisLoading(false)
        }).catch((error) => {
            console.log(error);
            setisLoading(false)

        })

    }

    useEffect(() => {
        GetCategories()
    }, [])

    return (
        <>
            <div className="container mx-auto text-center">
                {isLoading ? <Loader /> : <div className="flex flex-wrap">
                    {categories.map((category) => <div key={category._id} className="sm:w-full md:w-1/4 lg:w-1/6">
                        <div className="product px-2 py-3">
                            <Link to={`/CategoriesDetails/${category._id}`}>

                                <img src={category.image} className="w-[200px] h-[250px] my-8" alt="" />
                                <h3 className="text-main text-lg">{category.name}</h3>
                            </Link>

                        </div>
                    </div>)}
                </div>}
            </div>
        </>
    )
}
