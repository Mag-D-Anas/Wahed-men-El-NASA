import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";
import "./Maps.css";

const mapNames = {
    "co2":"/co2_emissions.csv",
    "n2o":"/natural_emissions.csv"
}
const Map = ({gas, max_year, default_year, title}) => {
    const [Emissions, setEmissions] = useState([]);
    const [allData, setAllData] = useState([]);
    const [countries, setCountries] = useState([]);
    const [year, setYear] = useState(default_year);
    const [dimensions, setDimensions] = useState({ width: 1000, height: 470 });
    const [loaded, setLoaded] = useState(false);
    const [stat, setStat] = useState({mean: 0, max: 0, highestCountry: ''});

    const calcStats = () => {
        if(setStat === undefined) return;
        const mean = Emissions.reduce((a, b) => a + b, 0) / Emissions.length;
        const max = Math.max(...Emissions);
        const highestCountry = countries[Emissions.indexOf(max)];
        setStat({mean, max, highestCountry});
    }
    useEffect(() => {
        const updateDimensions = () => {
            const containerWidth = document.querySelector('.map-container').offsetWidth;
            setDimensions({
                width: containerWidth,
                height: containerWidth * 0.5 // 2:1 aspect ratio
            });
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        Papa.parse(mapNames[gas], {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: (result) => {
                const data = result.data.filter(row => row.year !== null);
                setAllData(data);
                const uniqueCountries = [...new Set(data.flatMap(Object.keys))].filter(key => key !== 'year');
                setCountries(uniqueCountries);                
            },
        });
    }, []);
    useEffect(() => {
        setLoaded(true);
        setEmissions(extractEmissionsByYear(allData, year));
    }, [allData]);
    useEffect(() => {
        calcStats();
    }, [Emissions]);

    useEffect(() => {
        console.log(loaded, year, Emissions);
        handleYearChange({target: {value: year}});
    }, [loaded]);

    const extractEmissionsByYear = (data, year) => {
        const yearData = data.find(row => row.year === year);
        return yearData ? countries.map(country => yearData[country] || 0) : [];
    };

    const handleYearChange = (event) => {
        const selectedYear = parseInt(event.target.value);
        setYear(selectedYear);
        setEmissions(extractEmissionsByYear(allData, selectedYear));
    };

    return (
        <>
        <div className="map-container">
            {loaded && <Plot
                data={[
                    {
                        type: "choropleth",
                        locationmode: "country names",
                        locations: countries,
                        z: Emissions,
                        zmax: 1100,
                        zmin: 0,
                        colorscale: [
                            [0, 'rgb(255,255,255)'],
                            [0.2, 'rgb(220,237,200)'],
                            [0.4, 'rgb(169,219,160)'],
                            [0.6, 'rgb(109,192,134)'],
                            [0.8, 'rgb(53,151,143)'],
                            [1, 'rgb(1,102,94)']
                        ],
                        reversescale: false,
                        marker: {
                            line: {
                                color: 'rgb(180,180,180)',
                                width: 0.5
                            }
                        },
                        colorbar: {
                            autotick: false,
                            title: title,
                            tickformat: '.0f',
                            thickness: 20,
                            len: 0.86,
                            bgcolor: 'rgba(255,255,255,0)',
                            borderwidth: 1,
                            bordercolor: 'transparent',
                            outlinewidth: 0,
                        },
                    }
                ]}
                layout={{
                    title: {
                        text: title,
                        font: {
                            size: 14,
                        },
                        x: 0.5,
                        xanchor: 'center'
                    },
                    geo: {
                        showframe: false,
                        showcoastlines: true,
                        projection: { 
                            type: "equirectangular",
                            scale: 1
                        },
                        coastlinecolor: 'rgb(200,200,200)',
                        landcolor: 'rgb(250,250,250)',
                        showland: true,
                        showocean: true,
                        oceancolor: 'rgb(220,240,255)',
                        lonaxis: {
                            range: [-180, 180]
                        },
                        lataxis: {
                            range: [-90, 90]
                        },
                    },
                    width: dimensions.width,
                    height: dimensions.height,
                    margin: { l: 0, r: 0, t: 45, b: 0 },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                }}
                config={{
                    responsive: true,
                    displayModeBar: false,
                    staticPlot: false,
                }}
                onClick={(event) => console.log(event)}
            />}
            
                <div className="year-selector flex flex-col">
                    <span className="stats text-black space-x-8 flex-nowrap whitespace-nowrap max-sm:space-x-2 max-sm:text-xs">
                        <span className="stat"><b>Mean:</b> {stat ? stat.mean.toFixed(2) : 0}</span>
                        <span className="stat"><b>Max:</b> {stat ? stat.max.toFixed(2) : 0}</span>
                        <span className="stat"><b>Highest Country:</b> {stat ? stat.highestCountry : ''}</span>
                    </span>
                    <div className="flex w-full">
                        <input type="range"
                        min="2000"
                        max={max_year}
                        value={year}
                        onChange={handleYearChange}
                        className="w-full year-slider" />
                        <span className={`year-label ${(gas == 'co2' && year > 2022) && 'text-red-500'}`}>{year}</span>
                    </div>
                
            </div>
        </div>
        
        </>
    );
};

// USCO2Map: CO2 Emissions in the US
const USCO2Map = () => {
    const [usEmissions, setUsEmissions] = useState([]);
    const [states, setStates] = useState([]);
    const stateAbbreviations = {
        "Alabama": "AL",
        "Alaska": "AK",
        "Arizona": "AZ",
        "Arkansas": "AR",
        "California": "CA",
        "Colorado": "CO",
        "Connecticut": "CT",
        "Delaware": "DE",
        "Florida": "FL",
        "Georgia": "GA",
        "Hawaii": "HI",
        "Idaho": "ID",
        "Illinois": "IL",
        "Indiana": "IN",
        "Iowa": "IA",
        "Kansas": "KS",
        "Kentucky": "KY",
        "Louisiana": "LA",
        "Maine": "ME",
        "Maryland": "MD",
        "Massachusetts": "MA",
        "Michigan": "MI",
        "Minnesota": "MN",
        "Mississippi": "MS",
        "Missouri": "MO",
        "Montana": "MT",
        "Nebraska": "NE",
        "Nevada": "NV",
        "New Hampshire": "NH",
        "New Jersey": "NJ",
        "New Mexico": "NM",
        "New York": "NY",
        "North Carolina": "NC",
        "North Dakota": "ND",
        "Ohio": "OH",
        "Oklahoma": "OK",
        "Oregon": "OR",
        "Pennsylvania": "PA",
        "Rhode Island": "RI",
        "South Carolina": "SC",
        "South Dakota": "SD",
        "Tennessee": "TN",
        "Texas": "TX",
        "Utah": "UT",
        "Vermont": "VT",
        "Virginia": "VA",
        "Washington": "WA",
        "West Virginia": "WV",
        "Wisconsin": "WI",
        "Wyoming": "WY"
    };
    const [dimensions, setDimensions] = useState({ width: 1000, height: 470 });

    useEffect(() => {
        const updateDimensions = () => {
            const containerWidth = document.querySelector('.map-container').offsetWidth;
            setDimensions({
                width: containerWidth,
                height: containerWidth * 0.5 // 2:1 aspect ratio
            });
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        Papa.parse("/US_emissions.csv", {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: (result) => {
                const data = result.data;
                const stateNames = data.map((row) => row["State"]);
                setStates(stateNames.map((state) => stateAbbreviations[state]));
                setUsEmissions(data.map((row) => row["2021"]));
            },
        });
    }, []);

    return (
        <div>
            <div className="map-container">
            <Plot
                data={[
                    {
                        type: "choropleth",
                        locationmode: "USA-states",
                        locations: states,
                        z: usEmissions,
                        zmin: 0,
                        zmax: 100,
                        colorscale: "Reds",
                        reversescale: false,
                        marker: {
                            line: {
                                color: "rgb(180,180,180)",
                                width: 0.5,
                            },
                        },
                        colorbar: {
                            autotick: false,
                            title: "CO₂ Emissions (%)",
                        },
                    },
                ]}
                layout={{
                    title: {
                        text: "US States CO₂ Emissions (2021)",
                        font: {
                            size: 14,
                        },
                        x: 0.5,
                        xanchor: 'center'
                    },
                    geo: {
                        scope: "usa",
                        showlakes: true,
                        lakecolor: "rgb(255,255,255)",
                        showframe: false,
                        showcoastlines: false,
                        coastlinecolor: 'rgb(200,200,200)',
                        landcolor: 'rgb(250,250,250)',
                        showland: true,
                        showocean: true,
                        oceancolor: 'rgb(220,240,255)',
                        lonaxis: {
                            range: [-180, 180]
                        },
                        lataxis: {
                            range: [-90, 90]
                        },
                    },
                    width: dimensions.width,
                    height: dimensions.height,
                    margin: { l: 0, r: 0, t: 45, b: 0 },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                }}

                config={{
                    displayModeBar: false,
                }}
                
            />
            </div>
        </div>
    );
};

// Main App
const Maps = () => {
    return (
        <div>
            <h1>Global Emissions Maps</h1>
            <div id="N2OMap">
                <N2OMap />
            </div>
            <div id="CO2Map">
                <CO2Map />
            </div>
            <div id="USCO2Map">
                <USCO2Map />
            </div>
        </div>
    );
};

export default Maps;

export { Map, USCO2Map };
