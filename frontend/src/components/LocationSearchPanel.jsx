import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationSearchPanel = ({ pickup, setPickup, destination, setDestination, setPanelOpen, setVehiclePanelOpen, activeInput }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSuggestions = async (input) => {
      if (!input || input.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setSuggestions(response.data.suggestions);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
      setLoading(false);
    };

    // Fetch suggestions based on active input
    const searchText = activeInput === 'pickup' ? pickup : destination;
    getSuggestions(searchText);

  }, [pickup, destination, activeInput]);

  const handleSuggestionClick = (suggestion) => {
    const location = suggestion.description;
    if (activeInput === 'pickup') {
      setPickup(location);
    } else {
      setDestination(location);
    }
    if (pickup && destination) {
      setVehiclePanelOpen(true);
      setPanelOpen(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center p-4">
          <span>Loading suggestions...</span>
        </div>
      ) : suggestions.length > 0 ? (
        suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(suggestion)}
            className="flex items-center border-white active:border-violet-500 justify-start gap-4 my-2 border-2 p-3 rounded-xl cursor-pointer hover:bg-gray-50"
          >
            <h2 className="bg-[#eee] h-8 w-9 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-line text-violet-700"></i>
            </h2>
            <h4 className="font-medium">{suggestion.description}</h4>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">
          Enter at least 3 characters to see suggestions
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
