import {
    faBed,
    faCalendar,
    faCalendarDay,
    faCircleInfo,
    faImage,
    faLocation,
    faPerson,
    faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Header = ({ type }) => {
    const [destination, setDestination] = useState("");
    const [event, setEvent] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({ capacity: 0 });
    const navigate = useNavigate();
    const { dispatch } = useContext(SearchContext);

    const handleOption = (name, operation) => {
        setOptions((prev) => ({
            ...prev,
            [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
        }));
    };

    const handleSearch = () => {
        dispatch({
            type: "NEW_SEARCH",
            payload: { destination, event, dates, options },
        });
        if (!event || !destination) {
            alert("Event and Destination cannot be empty");
            navigate("/");
        } else {
            navigate("/halls", { state: { destination, event, dates, options } });
        }
    };

    return (
        <div className="header bg-gray-100">
            <div className={`headerContainer ${type === "list" ? "listMode" : ""}`}>
                {type !== "list" && (
                    <>
                        <br />
                        <h1 className="headerTitle text-3xl font-bold">Good Deeds</h1>
                        <p className="headerDesc text-gray-600">
                            Need help planning your event? We've got you covered!
                            With our event planning and unique design expertise, your event will look amazing!
                        </p>
                        <div className="headerSearch flex flex-wrap mt-4">
                            <div className="headerSearchItem flex items-center mr-4">
                                <FontAwesomeIcon icon={faLocation} className="headerIcon text-gray-700" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Select Your City"
                                    className="headerSearchInput p-2 border border-gray-300 rounded-md ml-2"
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>
                            <div className="headerSearchItem flex items-center mr-4">
                                <FontAwesomeIcon icon={faCalendarDay} className="headerIcon text-gray-700" />
                                <input
                                    type="text"
                                    placeholder="Which type of event?"
                                    className="headerSearchInput p-2 border border-gray-300 rounded-md ml-2"
                                    onChange={(e) => setEvent(e.target.value)}
                                />
                            </div>
                            <div className="headerSearchItem flex items-center mr-4">
                                <FontAwesomeIcon icon={faCalendar} className="headerIcon text-gray-700" />
                                <span
                                    onClick={() => setOpenDate(!openDate)}
                                    className="headerSearchText cursor-pointer text-gray-700 ml-2"
                                >
                                    Click here to select date
                                </span>
                                {openDate && (
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) => setDates([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dates}
                                        className="date"
                                        minDate={new Date()}
                                    />
                                )}
                            </div>
                            <div className="headerSearchItem flex items-center mr-4">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon text-gray-700" />
                                <span
                                    onClick={() => setOpenOptions(!openOptions)}
                                    className="headerSearchText cursor-pointer text-gray-700 ml-2"
                                >
                                    {options.capacity} people
                                </span>
                                {openOptions && (
                                    <div className="options bg-white border border-gray-300 rounded-md p-2 absolute mt-1">
                                        <div className="optionItem">
                                            <span className="optionText text-gray-700">Count</span>
                                            <div className="optionCounter flex items-center">
                                                <button
                                                    disabled={options.capacity <= 1}
                                                    className="optionCounterButton bg-gray-200 text-gray-700 rounded-l-md px-2"
                                                    onClick={() => handleOption("capacity", "d")}
                                                >
                                                    -
                                                </button>
                                                <span className="optionCounterNumber mx-2">
                                                    {options.capacity}
                                                </span>
                                                <button
                                                    className="optionCounterButton bg-gray-200 text-gray-700 rounded-r-md px-2"
                                                    onClick={() => handleOption("capacity", "i")}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="headerSearchItem">
                                <button
                                    className="headerBtn bg-blue-600 text-white p-2 rounded-md"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
