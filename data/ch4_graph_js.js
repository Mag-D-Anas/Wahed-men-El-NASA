// Load CSV file (replace 'data.csv' with the actual path to your CSV file)
d3.csv('ch4_annmean_gl.csv').then(function(data) {
    
    // Convert 'year' and 'mean' columns to numbers
    data.forEach(d => {
      d.year = +d.year; // convert year to number
      d.mean = +d.mean; // convert mean to number
    });

    // Plot settings
    const width = 800;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };

    // Create SVG with a white background
    const svg = d3.select("#plot").append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "white");  // Set the background to white

    // Set up scales for x (year) and y (mean)
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.year))  // Get the extent (min/max) of years
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.mean))  // Get the extent (min/max) of means
      .range([height - margin.bottom, margin.top]);

    // Generate the x-axis with formatted year (without commas)
    const xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d3.format("d"));

    // Generate the y-axis with "ppm" unit added
    const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat(d => d + " ppm");

    // Append x-axis to the SVG
    const xAxisGroup = svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    // Append y-axis to the SVG
    const yAxisGroup = svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    // Generate line function to create continuous line
    const line = d3.line()
      .x(d => xScale(d.year))  // Map x-values to the year
      .y(d => yScale(d.mean))  // Map y-values to the mean
      .curve(d3.curveMonotoneX); // Optional: Add curve smoothing

    // Append the continuous line to the SVG
    const path = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", line);  // Use the line generator

    // Tooltip element
    const tooltip = d3.select("#tooltip");

    // Add circles at data points to make them hoverable
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.mean))
      .attr("r", 5)
      .attr("fill", "blue")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`Year: ${d.year}<br>Mean: ${d.mean} ppm`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });

  });