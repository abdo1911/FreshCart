// import React from 'react'
// import styles from './BrandDetails.module.css'

import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../Loader/Loader";

export default function BrandDetails() {

    let { id } = useParams()
    const [brandDetails, setbrandDetails] = useState({});
    const [isLoading, setisLoading] = useState(true);




    async function GetPrdouctDetails() {

        return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`).then((data) => {
            setbrandDetails(data.data.data);
            setisLoading(false)
        }).catch((error) => {
            console.log(error);
            setisLoading(false)

        })

    }

    useEffect(() => {
        GetPrdouctDetails();
    }, [])


    return (
        <>
            {isLoading ? <Loader /> :
                <div className="container mx-auto mt-20 flex justify-center items-center">
                    <div className="flex justify-center items-center w-full">
                        <div className="w-3/4 mt-10 flex flex-col items-center">
                            <img src={brandDetails.image} className="w-[200px] h-[250px]" alt="" />
                            <h1 className="text-black font-bold text-2xl my-5 text-center">{brandDetails.name}</h1>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}



