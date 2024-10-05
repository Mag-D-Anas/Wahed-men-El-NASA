import Chart from "../Components/Chart";
import { Map } from "../Components/Maps";

const MapLevel = () => {
    return (
        <div>
        <div className="md:grid md:grid-cols-3 max-md:grid-rows-2 max-md:grid-cols-1 max-md:flex-wrap">
            <div className="col-span-2 max-md:grid-cols-1">
                <Map gas={'n2o'} max_year={'2020'} title={'N₂O Emissions'} />
            </div>
            <div className="flex flex-row items-center m-2">
                <Chart gas={'ch4'} className="w-full" />
            </div>
        </div>
        
        </div>
    );
    }

export default MapLevel;