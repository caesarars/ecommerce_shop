import React, { useEffect } from 'react'
import Navbar from "../components/Navbar"
import ImageBanner from '../components/ImageBanner/ImageBanner';
import ShopTagline from '../components/ShopTagline/ShopTagline';
import NewArrival from '../components/NewArrival/NewArrival';
import CollaborateBrands from '../components/CollaborateBrands/CollaborateBrands';
import DiscountBanner from '../components/DiscountBanner/DiscountBanner';
import Footer from '../components/Footer/Footer';
import withScrollAnimation from '../WrappedAnimationScroll';


const AnimatedShopTagline = withScrollAnimation(ShopTagline);
const AnimatedCollaborateBrands = withScrollAnimation(CollaborateBrands);
const AnimatedNewArrival = withScrollAnimation(NewArrival);
const AnimatedDiscountBanner = withScrollAnimation(DiscountBanner);

 const Homepage = () => {

    return (
        <>
                <Navbar/>
                <ImageBanner />
                <AnimatedShopTagline />
                <AnimatedCollaborateBrands />
                <AnimatedNewArrival />
                <AnimatedDiscountBanner />
                <Footer />
        </>
    )
}

export default Homepage;