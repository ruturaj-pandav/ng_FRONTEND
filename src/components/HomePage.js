import React from "react";
import NavbarLogout from "./Navbar_Logout.js";
import Features from "../homepageComponents/Features";
import FAQ from "../homepageComponents/FAQ";
import ContactForm from "../homepageComponents/ContactForm";
import Pricing from "../homepageComponents/Pricing";
import Footer from "../homepageComponents/Footer";
import CustomerReview from "../homepageComponents/CustomerReview";
import PageTitle from "./PageTitle";
export default function HomePage() {
  return (
    <div className="bg-gray-100 ">
      <PageTitle title="Home" />
      <NavbarLogout />
      <Features />
      <FAQ />
      <Pricing />
      <CustomerReview />
      <ContactForm />
      <Footer />
    </div>
  );
}
