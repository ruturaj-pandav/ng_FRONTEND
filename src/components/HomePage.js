import React from 'react'
import NavbarComponent from "./NavbarComponent.js";
import Features from "../homepageComponents/Features"
import FAQ from "../homepageComponents/FAQ"
import ContactForm from "../homepageComponents/ContactForm"
import Pricing from "../homepageComponents/Pricing"
import Footer from "../homepageComponents/Footer"
import CustomerReview from "../homepageComponents/CustomerReview"

export default function HomePage() {
  return (
    <div className="bg-gray-100 ">
      <NavbarComponent/>
      <Features/>
      <FAQ/>
      <Pricing/>
      <CustomerReview/>
      <ContactForm/>
      <Footer/>
      
      
    </div>
  )
}
