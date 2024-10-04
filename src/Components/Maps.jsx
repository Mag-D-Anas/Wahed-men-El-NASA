import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";
import "./Maps.css";

// N2OMap: N2O Emissions
const N2OMap = () => {
    const [n2oEmissions, setN2oEmissions] = useState([]);
    const [allData, setAllData] = useState([]);
    const [countries, setCountries] = useState([]);
    const [year, setYear] = useState(2020);

    useEffect(() => {
        Papa.parse("/natural_emissions.csv", {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: (result) => {
                const data = result.data.filter(row => row.year !== null); // Filter out rows with null year
                setAllData(data);

                const uniqueCountries = [...new Set(data.flatMap(Object.keys))].filter(key => key !== 'year');
                setCountries(uniqueCountries);

                setN2oEmissions(extractEmissionsByYear(data, year));
            },
        });
    }, []);

    const extractEmissionsByYear = (data, year) => {
        const yearData = data.find(row => row.year === year);
        return yearData ? countries.map(country => yearData[country] || 0) : [];
    };

    const handleYearChange = (event) => {
        const selectedYear = parseInt(event.target.value);
        setYear(selectedYear);
        setN2oEmissions(extractEmissionsByYear(allData, selectedYear));
    };

    return (
        <div className="map-container">
            <input
                type="range"
                min="2000"
                max="2020"
                value={year}
                onChange={handleYearChange}
                className="year-selector" />
            <Plot
                data={[
                    {
                        type: "choropleth",
                        locationmode: "country names",
                        locations: countries,
                        z: n2oEmissions,
                        zmax: 500,
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
                            title: 'N₂O Emissions',
                            tickformat: '.0f',
                            thickness: 20,
                            len: 0.9,
                            bgcolor: 'rgba(255,255,255,0.8)',
                            borderwidth: 1,
                            bordercolor: '#ccc',
                            outlinewidth: 0
                        },
                    },
                ]}
                layout={{
                    title: `Global N₂O Emissions in ${year}`,
                    geo: {
                        showframe: false,
                        showcoastlines: true,
                        projection: { type: "mercator" },
                        coastlinecolor: 'rgb(200,200,200)',
                        landcolor: 'rgb(250,250,250)',
                        showland: true,
                        showocean: true,
                        oceancolor: 'rgb(220,240,255)',
                    },
                    width: 1000,
                    height: 350,
                    margin: { l: 0, r: 0, t: 0, b: 0 },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                }}
                config={{
                    responsive: true,
                    displayModeBar: false,
                }}
            />
        </div>
    );
};


// CO2Map: CO2 Emissions in the World
const CO2Map = () => {
    const [co2Emissions, setCo2Emissions] = useState([]);
    const [allData, setAllData] = useState([]);
    const [countries, setCountries] = useState([]);
    const [year, setYear] = useState(2020);

    useEffect(() => {
        Papa.parse("/co2_emissions.csv", {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: (result) => {
                const data = result.data.filter(row => row.year !== null); // Filter out rows with null year
                setAllData(data);

                const uniqueCountries = [...new Set(data.flatMap(Object.keys))].filter(key => key !== 'year');
                setCountries(uniqueCountries);

                setCo2Emissions(extractEmissionsByYear(data, year));
            },
        });
    }, []);

    const extractEmissionsByYear = (data, year) => {
        const yearData = data.find(row => row.year === year);
        return yearData ? countries.map(country => yearData[country] || 0) : [];
    };

    const handleYearChange = (event) => {
        const selectedYear = parseInt(event.target.value);
        setYear(selectedYear);
        setCo2Emissions(extractEmissionsByYear(allData, selectedYear));
    };

    return (
        <div>
            <input
                type="range"
                min="2000"
                max="2022"
                value={year}
                onChange={handleYearChange}
            />
            <Plot
                data={[
                    {
                        type: "choropleth",
                        locationmode: "country names",
                        locations: countries,
                        z: co2Emissions,
                        zmin: 0,
                        zmax: 5000,
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
                            title: `CO₂ Emissions in ${year}`,
                        },
                    },
                ]}
                layout={{
                    title: `Global CO₂ Emissions in ${year}`,
                    geo: {
                        showframe: false,
                        showcoastlines: false,
                        projection: { type: "mercator" },
                    },
                    width: 1000,
                    height: 1000,
                }}
            />
        </div>
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
                    title: "US States CO₂ Emissions",
                    geo: {
                        scope: "usa",
                        showlakes: true,
                        lakecolor: "rgb(255,255,255)",
                        showframe: false,
                        showcoastlines: false,
                    },
                }}
            />
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

export { N2OMap, CO2Map, USCO2Map };
