

//Map1 : natural emission N2o from the world 
//plot in div called map

function normalizeData(data) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    
    return data.map(value => (value - min) / (max - min));
}


function extractEmissionsByYear(data, year) {
    // Create an empty object to store emissions
    let emissions = [];

    // Iterate over the data array
    data.forEach(row => {
        
        if (row[""] === ""+year) {
            countries.forEach(country=>{
                emissions.push(row[country]);
            })
        }
        
    });
    return emissions; // Return the emissions object
}

let n2oEmissions = [];
const countries = [];
let Alldata =[];
// Event listener for year slider
d3.select('#yearSlider').on('input', function() {
    const selectedYear = this.value; // Get the selected year from the slider
    n2oEmissions=extractEmissionsByYear(Alldata,selectedYear); // Update the map for the selected year
    plotMap();
});

d3.csv("natural_emissions.csv",(function(data) {
    Alldata= data;
   
    const header = Object.keys(data[0]); // Get the keys from the first object (row)
    
    for (let i = 1; i < header.length; i++) { // Start from 1 to skip the first empty header
        countries.push(header[i]); // Push country names
    }

    n2oEmissions = extractEmissionsByYear(data, 2020);
    plotMap();
}));
    // Create a choropleth map
function plotMap (){
    const mapData = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: countries,
        z: n2oEmissions,
        zmax:500,
        zmin:0,
        colorscale: 'Greens',  // You can change the color scale
        autocolorscale: false,
        reversescale: true,
        marker: {
            line: {
                color: 'rgb(180,180,180)',
                width: 0.5
            }
        },
        colorbar: {
            autotick: false,
            tickprefix: '',
            title: 'N₂O Emissions<br>in 2020'
        }
    }];

    const layout = {
        title: 'Global N₂O Emissions from Natural Causes (2020)',
        geo: {
            showframe: false,
            showcoastlines: false,
            projection: {
                type: 'mercator'  // Map projection type
            }
        },
        width: 1000,
        height: 1000
    };

    Plotly.newPlot('map', mapData, layout);
}









//_________________________________________________________________________________________________________-
//_________________________________________________________________________________________________________


//map2 : co2 emissions in all the world 
//plot in div called map2

function extractEmissionsByYear2(data, year) {
    // Create an empty object to store emissions
    let emissions = [];

    // Iterate over the data array
    data.forEach(row => {
        
        if (row[""] === ""+year) {
            countries.forEach(country=>{
                emissions.push(row[country]);
            })
        }
        
    });
    return emissions; // Return the emissions object
}

let co2Emissions = [];
let Alldata2 =[];
// Event listener for year slider
d3.select('#yearSlider2').on('input', function() {
    const selectedYear = this.value; // Get the selected year from the slider
    co2Emissions=extractEmissionsByYear2(Alldata2,selectedYear); // Update the map for the selected year
    plotMap2();
});

d3.csv("co2_emissions.csv",(function(data) {
    Alldata2= data;
       
    co2Emissions = extractEmissionsByYear2(data, 2020);
    plotMap2();
}));
    // Create a choropleth map
function plotMap2 (){
    
    const mapData = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: countries,
        z: co2Emissions,
        zmin: 0,       // Set minimum value for the color scale
        zmax: 5000, // Set maximum value for the color scale
        colorscale: 'Reds',  // You can change the color scale
        autocolorscale: false,
        reversescale: false,
        marker: {
            line: {
                color: 'rgb(180,180,180)',
                width: 0.5
            }
        },
        colorbar: {
            autotick: false,
            tickprefix: '',
            title: 'CO2 Emissions<br>'
        }
    }];

    const layout = {
        title: 'Global CO2 Emissions',
        geo: {
            showframe: false,
            showcoastlines: false,
            projection: {
                type: 'mercator'  // Map projection type
            }
        },
        width: 1000,
        height: 1000
    };

    Plotly.newPlot('map2', mapData, layout);
}


// Function to update the year label when the slider moves
function updateYearLabel(value) {
    document.getElementById('yearLabel').innerText = value;
}

// You can set the initial value if necessary (e.g., starting at 2000)
document.getElementById('yearSlider2').value = 2000;
updateYearLabel(2000);










//_________________________________________________________________________________________________________-
//_________________________________________________________________________________________________________


//map3 : co2 emissions in US (unitied states )only
//plot in div called map3

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
const emissions = [];
let states =[];
 d3.csv("US_emissions.csv",(function(data) {
   
    data.forEach(row=>{
        states.push(row['State'])
    })
    data.forEach(row=>{
        emissions.push(row['2021']);
    })
    console.log(emissions);
    console.log(states);
    states = states.map (state=> stateAbbreviations[state]);

    PlotMap3();
}));

function PlotMap3 (){
    
        
        const mapData = [{
            type: 'choropleth',
            locationmode: 'USA-states',
            locations: states,
            z: emissions,
            zmin: 0,
            zmax: 100,
            colorscale: 'Reds',
            autocolorscale: false,
            reversescale: false,
            marker: {
                line: {
                    color: 'rgb(180,180,180)',
                    width: 0.5
                }
            },
            colorbar: {
                autotick: false,
                tickprefix: '%',
                title: 'CO2 Emissions<br>Percentage'
            }
        }];
    
        const layout = {
            title: 'U.S. States CO2 Emissions',
            geo: {
                scope: 'usa',
                showlakes: true,
                lakecolor: 'rgb(255, 255, 255)',
                showframe: false,
                showcoastlines: false
            }
        };
    
        Plotly.newPlot('map3', mapData, layout);
}