import React from 'react';
import ContactForm from './ContactForm';
import Navbar from '../../CommonComponents/Navbar';
import Footer from '../../CommonComponents/Footer';


const ContactPage = () => {
    return (
        <>
        <Navbar color="#704F4F" hoverColor="#472D2D"/>
        <ContactForm />
        <Footer color="white" backColor="#704F4F" />
        </>
    );
  };
  
  export default ContactPage;