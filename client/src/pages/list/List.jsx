import Navbar from "../../components/navbar/Navbar.jsx";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import MailList from "../../components/mailList/MailList";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [event, setEvent] = useState(location.state.event);
  const { data, loading, error, reFetch } = useFetch(`/halls?city=${destination}&type=${event}`);

  const handleClick = () => {
    reFetch();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Header type="list" />

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Search</h1>
          <div className="flex flex-col md:flex-row md:justify-between md:space-x-4">
            <div className="flex flex-col mb-4 md:mb-0 w-full md:w-1/2">
              <label className="text-lg font-semibold text-gray-700 mb-2">Enter City</label>
              <input
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={destination}
                onChange={(e) => setDestination(e.target.value)}
                type="text"
              />
            </div>
            <div className="flex flex-col mb-4 md:mb-0 w-full md:w-1/2">
              <label className="text-lg font-semibold text-gray-700 mb-2">Event Type</label>
              <input
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={event}
                onChange={(e) => setEvent(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <button
            onClick={handleClick}
            className="w-full bg-blue-600 text-white rounded-lg p-3 mt-4 hover:bg-blue-700 transition duration-200"
          >
            Search
          </button>
        </div>

        <div className="listResult">
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item) => (
                <SearchItem item={item} key={item._id} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {error && <div className="text-red-500 text-center mt-4">{error.message}</div>}
    </div>
  );
};

export default List;
