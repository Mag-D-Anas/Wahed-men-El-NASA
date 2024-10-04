import Chart from "../Components/Chart";
import { Map, USCO2Map } from "../Components/Maps";

const MapLevel = () => {
    return (
        <div>
        <div className="grid lg:grid-cols-2 max-md:grid-rows-2 max-md:grid-cols-1 flex-wrap">
            <div className="flex flex-row items-center col-span-1 max-md:grid-cols-1">
                <Map gas={'co2'} max_year={'2022'} title={'CO₂ Emissions'}/>
                <USCO2Map />
            </div>
            <div className="flex flex-row items-center">
                <USCO2Map />
                <Chart gas={'co2'} className="w-full" />
                <div className=" bg-gray-800 text-white p-4 rounded-lg mt-4 w-full max-w-sm">
                    <p>Mean: 1000ppm</p>
                    <p>Max: 2000ppm</p>
                    <p>Min: 500ppm</p>
                </div>
            </div>
        </div>
        
        </div>
    );
    }

export default MapLevel;