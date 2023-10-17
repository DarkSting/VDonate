import Footer from "../../CommonComponents/Footer";
import Navbar from "../../CommonComponents/Navbar";
import Content from "./components/Body";
import ImageSlider from "./components/ImageSlider";



export default function(){

    return(
        <>
        <Navbar color="#704F4F" hoverColor="#472D2D"/>
        <ImageSlider />
        <Content />
        <Footer />
        </>
    );
}


