import Chart from "../Components/Chart";
import { Map, USCO2Map } from "../Components/Maps";

const MapLevel = () => {

    return (
        <div>
        <div className="grid lg:grid-cols-2 lg:grid-rows-2 max-md:grid-cols-1 flex-wrap">
            <div className="col-span-1 max-md:grid-cols-1 m-1">
                <Map gas={'co2'} max_year={2042} title={'CO₂ Emissions'} default_year={2022} />
            </div>
            <div className="w-full text-left m-1 flex flex-col items-center">
                <div className="card space-y-3 w-auto center">
                    <p>Imagine standing in your home, watching the ocean rise, inch by inch, threatening to wash away everything you've built. Each year, millions of tonnes of CO2, like the 83 million metric tonnes emitted by Los Angeles, fuel climate change and bring that future closer. If we don’t take action soon, the consequences will become a harsh reality for us all.</p>
                    <p><b><i>Los Angeles</i></b>, a sprawling city of ambition, is an unknowing aggressor, releasing this CO2 from its cars and factories. In stark contrast, the Small Island Developing States (SIDS) are the victims, fighting for their existence as rising seas devour their homes.</p>
                    <p><b><i>SIDS</i></b>, rich in culture and history, now face saltwater intrusion, failed crops, and devastating storms that wash away everything they hold dear. While LA thrives, SIDS lose everything, battling not just the tides but for their future in a world that has turned a blind eye to their plight.</p>
                </div>
                <div className="card space-y-3 w-auto center">
                    <p>The results after 2022 <i className="text-red-500"><b>Highlighted in red</b></i> are generated using a Machine Learning Model (ARIMA), after each prediction/iteration the model checks its accuracy and makes adjustments to improve its predictions.
                    So, with data from 1960 to 2022 in hand, we’ve boldly forecasted what emissions will look like from 2023 to 2042.</p>
                </div>
            </div>
            <div className="flex flex-col items-center m-1">
                
            <USCO2Map />
            </div>
            
            <div className="flex flex-col items-center m-1">
                
                <Chart gas={'co2'} height={280}/>
            </div>
        </div>
        
        </div>
    );
    }

export default MapLevel;