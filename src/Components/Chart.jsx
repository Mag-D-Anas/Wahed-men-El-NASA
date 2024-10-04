import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Typography, Paper } from "@mui/material";
import Papa from "papaparse";

const chartNames = {
    "co2":"/co2_annmean_mlo.csv",
    "ch4":"ch4_annmean_gl.csv/"
}

const Chart = ({gas}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const filename = chartNames[gas];
    // Load and parse CSV file using PapaParse
    Papa.parse(filename, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setData(result.data.map(d => ({ year: d.year, mean: d.mean })));
      },
    });
    console.log(data);
  }, []);

  return (
    <Paper elevation={3} style={{ padding: 20, margin: 20 }}>
      <Typography variant="h6" gutterBottom>
        CH4 Mean Concentration Over Years
      </Typography>
      <Box style={{ height: 500 }}>
        <LineChart
        dataset={data}
          xAxis={[
            {
              dataKey: "year",
              label: "Year",
              type: "number", // Treat the x-axis as a continuous number scale
              min: Math.min(...data.map(d => d.year)), // Dynamically set the min
              max: Math.max(...data.map(d => d.year)), // Dynamically set the max
              ticks: data.map(d => d.year), // Set specific tick values for years
              valueFormatter: (date) => date.toString(),
            },
          ]}
          series={[
            {
              dataKey: "mean",
              label: "Mean (ppm)",
              color: "red",
              showMark: true, // Show dots on the data points
            },
          ]}
          width={800}
          height={500}
          margin={{ top: 20, right: 20, bottom: 50, left: 70 }}
        />
      </Box>
    </Paper>
  );
};

export default Chart;
