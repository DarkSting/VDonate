import Navbar from "../../CommonComponents/Navbar";
import ContactPage from "./ContactPage";
import Footer from "../../CommonComponents/Footer";

export default function () {
  return (
    <>
      <Navbar color="#0C356A" hoverColor="#279EFF" />
      <ContactPage />
      <Footer backColor="#0C356A" marginTop="100px" />
    </>
  );
}
