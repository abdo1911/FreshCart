// import React from 'react'
// import styles from './Home.module.css'

import Catslider from "../Catslider/Catslider";
import FeatureProducts from "../FeatureProducts/FeatureProducts";
import MainSlider from "../MainSlider/MainSlider";

export default function Home() {
    return (
        <>
            <MainSlider />
            <Catslider />
            <FeatureProducts />
        </>
    )
}
