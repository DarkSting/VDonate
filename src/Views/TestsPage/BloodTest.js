import Navbar from "../../CommonComponents/DashNavBar"
import Sidebar from "./Components/Sidebar";


export default function TestPage(){

    return(

        <>
        <Navbar color="#A459D1" hoverColor="#6F1AB6" />
        <Sidebar bordeColor="#6F1AB6" backColor="#B799FF" backHoverColor="#A459D1" />
        </>
    );
}