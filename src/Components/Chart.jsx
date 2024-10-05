import { useState, useEffect, useRef } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Typography, Paper } from "@mui/material";
import Papa from "papaparse";

const chartNames = {
  "co2": "/co2_annmean_mlo.csv",
  "ch4": "/ch4_annmean_gl.csv"
};

const Chart = ({ gas, height }) => {
  const [data, setData] = useState([]);
  const chartContainerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

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
  }, [gas]);

  useEffect(() => {
    // Set the chart width based on the container's width
    const handleResize = () => {
      if (chartContainerRef.current) {
        setChartWidth(chartContainerRef.current.offsetWidth);
      }
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full">
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h6" gutterBottom>
          {gas.toUpperCase()} Mean Concentration Over Years
        </Typography>
        <Box ref={chartContainerRef} style={{ height: height || 340, width: "100%" }}>
          <LineChart
            dataset={data}
            xAxis={[
              {
                dataKey: "year",
                label: "Year",
                type: "number",
                min: Math.min(...data.map(d => d.year)),
                max: Math.max(...data.map(d => d.year)),
                ticks: data.map(d => d.year),
                valueFormatter: (date) => date.toString(),
              },
            ]}
            series={[
              {
                dataKey: "mean",
                label: "Mean (ppm)",
                color: "red",
                showMark: true,
              },
            ]}
            width={chartWidth} // Dynamically set the width
            margin={{ top: 20, right: 20, bottom: 50, left: 70 }}
          />
        </Box>
      </Paper>
    </div>
  );
};

export default Chart;
