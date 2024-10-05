import { useState } from "react";
import Chart from "../Components/Chart";
import { Map, USCO2Map } from "../Components/Maps";

const MapLevel = () => {
    const [stat, setStat] = useState({mean: 0, max: 0, highestCountry: ''});

    return (
        <div>
        <div className="grid lg:grid-cols-3 max-md:grid-rows-2 max-md:grid-cols-1 flex-wrap">
            <div className="col-span-2 max-md:grid-cols-1">
                <Map gas={'co2'} max_year={'2022'} title={'CO₂ Emissions'} setStat={setStat} />
                <USCO2Map />
            </div>
            <div className="flex flex-col items-center">
                <Chart gas={'co2'} className="w-full" />
                <div className=" bg-gray-800 text-white p-4 rounded-lg mt-4 w-full max-w-sm">
                    <p><b>Mean:</b> {stat.mean.toFixed(2)}ppm</p>
                    <p><b>Max:</b> {stat.max.toFixed(2)}ppm</p>
                    <p><b>Highest Country:</b> {stat.highestCountry}</p>
                </div>
            </div>
        </div>
        
        </div>
    );
    }

export default MapLevel;