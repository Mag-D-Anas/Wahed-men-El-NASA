import Chart from "../Components/Chart";
import { Map } from "../Components/Maps";

const MapLevel = () => {
    return (
        <div>
        <div className="grid lg:grid-cols-3 max-md:grid-rows-2 max-md:grid-cols-1 flex-wrap">
            <div className="col-span-2 max-md:grid-cols-1">
                <Map gas={'n2o'} max_year={'2020'} title={'N₂O Emissions'}/>
            </div>
            <div className="flex flex-col items-center">
                <Chart gas={'ch4'} className="w-full" />
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