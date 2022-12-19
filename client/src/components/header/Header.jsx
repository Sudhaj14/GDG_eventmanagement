import { faBed, faCalendar, faCalendarDay, faCircleInfo, faImage, faLocation, faPerson, faVideoCamera,   } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { setDate } from "date-fns"
import { useContext, useState } from "react"
import { DateRange } from "react-date-range"
import "./header.css"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"

const Header = ({type}) =>{
    
    const [destination, setDestination] = useState("");
    const [event,setEvent]=useState("");
    const [openDate,setOpenDate]= useState(false)
    const [dates,setDates]= useState([
        
        {
            startDate:new Date(),
            endDate: new Date(),
            key:'selection',
        }
        
    ]);

    
    const [openOptions,setOpenOptions]=useState(false);
    const [options,setOptions]=useState({
        capacity:0,
    });

    const navigate =  useNavigate()
    

    const handleOption = (name,operation) =>{
        setOptions(prev=> {return{
            ...prev,[name]:operation === "i" ? options[name] +100 : options[name]-100
        }})
    };

    const {dispatch}=useContext(SearchContext);

    const handleSearch=()=>{
        dispatch({ type: "NEW_SEARCH", payload: { destination,event, dates, options } });
        if(!event || !destination){
            alert("Event and Destination cannot be empty")
            navigate("/")
        }
        else{
            navigate("/halls",{state:{destination,event,dates,options}}) ;
        }
       
    }
    

    return(
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                
                { type !== "list" &&
                <>
                <br/>
                <h1 className= "headerTitle" > Good Deeds </h1>
                <p className="headerDesc">
                Need help planning your event ?We've got you covered!
                wish your event planning and unique event design expertise,your event look amazing!
                </p>
                
                <div className="headerSearch">
                   
                <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faLocation} className="headerIcon"/>
                        <input 
                        type="text" 
                        required=" "
                        placeholder="Select Your City" 
                        className="headerSearchInput"
                        onChange={(e) => setDestination(e.target.value)}
                        
                        /> 
                    </div>
                <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDay} className="headerIcon"/>
                        <input 
                        type="text" 
                        placeholder="Which type of event?" 
                        className="headerSearchInput"
                        onChange={(e) => setEvent(e.target.value)}
                        /> 
                    </div>
                    
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendar} className="headerIcon"/>
                        <span onClick={()=> setOpenDate(!openDate)} className="headerSearchText"
                        >Click here to select date </span>
                        { openDate && (
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item)=> setDates([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={dates}
                          className="date"
                          minDate={new Date()}
                        />
                        )}
                         
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                        <span onClick={()=> setOpenOptions(!openOptions)} className="headerSearchText">{options.capacity} people</span>
                        {openOptions && <div className="options">
                            <div className= "optionItem">
                            <span className="optionText">Count</span>
                            <div className="optionCounter">
                                <button 
                                disabled={options.capacity<=1}
                                className="optionCounterButton" 
                                onClick={()=> handleOption("capacity","d")}>-</button> 
                                <span className="optionCounterNumber">{options.capacity}</span>
                                <button className="optionCounterButton" 
                                onClick={()=> handleOption("capacity","i")}>+</button>
                            </div>

                            </div>

                        </div>}
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSearch}>Search</button>
                    </div>    
                </div> </>
                }
            </div>
        </div>
    )
    }

export default Header
