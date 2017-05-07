function createBarChart(targetElement, jsonData) {

  // set the dimensions and margins of the graph
  var margin = {
      top: 20,    // Top Title Height
      right: 20,  // Right Axis Width
      bottom: 80, // Bottom Axis Height
      left: 80    // Left Axis Width
    },
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  // parse the date / time
  var parseTime = d3.timeParse("%d-%b-%y");

  // set the ranges
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // define the line
  var valueline = d3.line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.uniqueInsiders);
    });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(targetElement).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // Get the data
  d3.json(jsonData, function(error, data) {
    if (error) throw error;

    data = data.builds[0].health.daily
    // format the data
    data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.uniqueInsiders = +d.uniqueInsiders;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) {
      return d.date;
    }));
    y.domain([0, d3.max(data, function(d) {
      return d.uniqueInsiders;
    })]);

    // Add the valueline path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);


    var p = d3.precisionPrefix(1e5, 1.3e6);

    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")))
      .selectAll("text") 
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    // Add the Y Axis
    svg.append("g")
      .call(d3.axisLeft(y).tickFormat(d3.formatPrefix("." + p, 1.3e6)));

  });

}