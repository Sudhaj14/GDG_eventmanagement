import Navbar from "../../components/navbar/Navbar.jsx";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import MailList from "../../components/mailList/MailList";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Slider from "../slider/Slider.jsx";

const Home = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleClick = () => {
        setOpenModal(true);
    };

    return (
        <div className="bg-gray-50">
            <Navbar />
            <Header />

            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center my-8 text-blue-600">Browse By Event Type</h1>
                <PropertyList />

                <h1 className="text-4xl font-bold text-center my-8 text-blue-600">Popular Halls</h1>
                <FeaturedProperties />

                <h1 className="text-4xl font-bold text-center my-8 text-blue-600">Featured Locations</h1>
                <ul className="list-disc list-inside text-center space-y-2">
                    <li className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition duration-300">Karimnagar</li>
                    <li className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition duration-300">Hyderabad</li>
                    <li className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition duration-300">Warangal</li>
                </ul>

                <Slider />

                <a
                    href="/contact"
                    onClick={handleClick}
                    className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
                >
                    <FontAwesomeIcon icon={faPhone} />
                </a>

                {openModal && <MailList setOpen={setOpenModal} />}
            </div>
        </div>
    );
};

export default Home;
