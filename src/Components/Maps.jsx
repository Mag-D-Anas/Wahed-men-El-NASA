import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";

// Map1: N2O Emissions
const Map1 = () => {
    const [n2oEmissions, setN2oEmissions] = useState([]);
    const [allData, setAllData] = useState([]);
    const [countries, setCountries] = useState([]);
    const [year, setYear] = useState(2020);

    useEffect(() => {
        // Load and parse CSV data
        Papa.parse("/natural_emissions.csv", {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: (result) => {
                const data = result.data;
                setAllData(data);

                const header = Object.keys(data[0]);
                const _countries = header.slice(1); // Skip first empty header
                console.log(_countries)
                setCountries(_countries);

                // Extract emissions for the initial year (2020)
                setN2oEmissions(extractEmissionsByYear(data, 2020));
            },
        });
    }, []);

    const extractEmissionsByYear = (data, year) => {
        // Log the data to understand its structure
        console.log(year);

        // Assuming the year is stored under the header 'Year', replace with the actual header name
        const yearColumn = 'year'; // Replace with the actual header name for the year
        console.log(data
            .filter((row) => row[yearColumn] === year) // Check if year is correct
            .map((row) => countries.map((country) => row[country] || 0)) // Add fallback for empty values
            .flat())
        return data
            .filter((row) => row[yearColumn] === "" + year) // Check if year is correct
            .map((row) => countries.map((country) => row[country] || 0)) // Add fallback for empty values
            .flat(); // Flatten the result to ensure it's a flat array
    };


    const handleYearChange = (event) => {
        const selectedYear = event.target.value;
        console.log(selectedYear)
        setYear(selectedYear);
        setN2oEmissions(extractEmissionsByYear(allData, selectedYear));
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
                        z: n2oEmissions,
                        zmax: 500,
                        zmin: 0,
                        colorscale: "Greens",
                        reversescale: true,
                        marker: {
                            line: {
                                color: "rgb(180,180,180)",
                                width: 0.5,
                            },
                        },
                        colorbar: {
                            autotick: false,
                            title: `N₂O Emissions in ${year}`,
                        },
                    },
                ]}
                layout={{
                    title: `Global N₂O Emissions in ${year}`,
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


// Map2: CO2 Emissions in the World
const Map2 = () => {
    const [co2Emissions, setCo2Emissions] = useState([]);
    const [allData2, setAllData2] = useState([]);
    const [year2, setYear2] = useState(2020);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        // Load and parse CSV data
        Papa.parse("/co2_emissions.csv", {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: (result) => {
                const data = result.data;
                setAllData2(data);
                setCo2Emissions(extractEmissionsByYear2(data, 2020));
            },
        });
    }, []);

    const extractEmissionsByYear2 = (data, year) => {
        return data
            .filter((row) => row[""] === "" + year)
            .map((row) => countries.map((country) => row[country]));
    };

    const handleYearChange = (event) => {
        const selectedYear = event.target.value;
        setYear2(selectedYear);
        setCo2Emissions(extractEmissionsByYear2(allData2, selectedYear));
    };

    return (
        <div>
            <input
                type="range"
                min="2000"
                max="2020"
                value={year2}
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
                            title: `CO₂ Emissions in ${year2}`,
                        },
                    },
                ]}
                layout={{
                    title: `Global CO₂ Emissions in ${year2}`,
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

// Map3: CO2 Emissions in the US
const Map3 = () => {
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
            <div id="map1">
                <Map1 />
            </div>
            <div id="map1">
                <Map2 />
            </div>
            <div id="map3">
                <Map3 />
            </div>
        </div>
    );
};

export default Maps;
