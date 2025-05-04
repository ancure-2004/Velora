import React from "react";

const LocationSearchPanel = (props) => {
	{
		/* This are sample locations */
	}
	const locations = [
		"Sector 7, Wave City NH-24, Ghaziabad",
    "Sector 7, Wave City NH-24, Ghaziabad",
    "Sector 7, Wave City NH-24, Ghaziabad",
    "Sector 7, Wave City NH-24, Ghaziabad",
	];

	return (
		<div>
			{/* This is a sample Data */}
			{
        locations.map(function (element, idx) {
          return (
            <div key={idx}
              onClick={() =>{
                props.setVehiclePanelOpen(true)
                props.setPanelOpen(false)
              } }
              className="flex items-center border-white active:border-violet-500 justify-start gap-4 my-2 border-2 p-3 rounded-xl">
              <h2 className="bg-[#eee] h-8 w-9 flex items-center justify-center rounded-full">
                <i className="ri-map-pin-line text-violet-700"></i>
              </h2>
              <h4 className="font-medium">{element}</h4>
            </div>
          )
			  })
      }
		</div>
	);
};

export default LocationSearchPanel;
