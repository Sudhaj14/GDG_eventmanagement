import Navbar from "../../components/navbar/Navbar.jsx";
import "./home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured"
import PropertyList from "../../components/propertyList/PropertyList"
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties"
import MailList from "../../components/mailList/MailList";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faPlus } from "@fortawesome/free-solid-svg-icons";
import Slider from "../slider/Slider.jsx";


const Home = () => {
   
    const [openModal, setOpenModal] = useState(false);

    const handleClick = () => {
       
          setOpenModal(true);
       
      };


    return(
        
        <div class="home">
            <Navbar/>
            <Header/>
            <div className="homeContainer">
                <br></br>
            <h1 className="homeTitle">Browse By Event Type</h1>
            <PropertyList/>
            <br></br>
            <h1 className="homeTitle">Popular Halls</h1>
            <FeaturedProperties/>
            <br></br>
            <h1 className="homeTitle">Featured Locations</h1>
            <br></br>
            <ul className="lists1">
                <ul>Karimnagar</ul>
                <ul>Hyderabad</ul>
                <ul>Warangal</ul>
            </ul>
            <Slider/>
            <br></br>
            
            <a href="/contact" onClick={handleClick} class="float">
            <FontAwesomeIcon icon={faPhone} className="my-float"/>
            </a>     
            <div>{openModal && <MailList setOpen={setOpenModal}/>}</div>
            
            </div>
            
            
        </div>
        
    )
}

export default Home
