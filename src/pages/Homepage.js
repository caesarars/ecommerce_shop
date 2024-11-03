import React from 'react'
import Navbar from "../components/Navbar"
import ImageBanner from '../components/ImageBanner/ImageBanner';
import ShopTagline from '../components/ShopTagline/ShopTagline';
import NewArrival from '../components/NewArrival/NewArrival';
import CollaborateBrands from '../components/CollaborateBrands/CollaborateBrands';
import DiscountBanner from '../components/DiscountBanner/DiscountBanner';
import Footer from '../components/Footer/Footer';

 const Homepage = () => {
    return (
        <>
                <Navbar/>
                <ImageBanner />
                <ShopTagline />
                <CollaborateBrands />
                <NewArrival />
                <DiscountBanner />
                <Footer />
        </>
    )
}

export default Homepage;