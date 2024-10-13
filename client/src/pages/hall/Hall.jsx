
import Navbar from "../../components/navbar/Navbar.jsx";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch.js";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import { format } from "date-fns";

const Hall = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dates } = useContext(SearchContext);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/halls/find/${id}`);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  let days = dayDifference(dates[0].endDate, dates[0].startDate);
  if (days === 0) {
    days = days + 1;
  }

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? data.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === data.photos.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-gray-100">
      <Navbar />
      <Header type="list" />
      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <div className="max-w-5xl mx-auto p-5">
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="relative bg-white p-5 rounded-lg">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="absolute top-2 right-2 cursor-pointer text-red-500"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                  onClick={() => handleMove("l")}
                />
                <div className="flex justify-center">
                  <img src={data.photos[slideNumber]} alt="" className="w-full h-auto rounded-lg" />
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                  onClick={() => handleMove("r")}
                />
              </div>
            </div>
          )}
          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <button onClick={handleClick} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Reserve or Book Now!
            </button>
            <h1 className="text-2xl font-bold mt-4">{data.name}</h1>
            <div className="flex items-center mt-2">
              <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-gray-600" />
              <span className="text-gray-600">{data.address}</span>
            </div>
            <span className="block text-gray-500 mt-2">
              Capacity – {data.distance} people
            </span>
            <span className="block text-xl font-semibold mt-2 text-blue-700">
              Event Hall Price: Rs. {data.affordableprice}
            </span>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {data.photos?.map((photo, i) => (
                <div className="relative" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="w-full h-40 object-cover rounded-md cursor-pointer hover:opacity-75"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h1 className="text-xl font-semibold">Description</h1>
              <p className="mt-2 text-gray-600">{data.desc}</p>
              <h2 className="text-lg font-bold mt-4">
                <b>Rs.{days * data.affordableprice}</b> ({days} Days)
              </h2>
              <span className="block mt-2 text-gray-500">
                Selected Dates: {format(dates[0].startDate, "MM/dd/yyyy")} to {format(dates[0].endDate, "MM/dd/yyyy")}
              </span>
              <button onClick={handleClick} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hallId={id} hname={data.name} hprice={data.affordableprice} />}
    </div>
  );
};

export default Hall;
