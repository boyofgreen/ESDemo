var buildData = null;

document.addEventListener("DOMContentLoaded", function(){
    //Load Windows build data
    //Removing this call temporarily
    getBuildData();
});

// XHR request to load common templates
function loadHandlebarsTemplate(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var raw = xhr.responseText;
            var compiled = Handlebars.compile(raw);
            callback(compiled);
        }
    };
    xhr.send();
}

// Sample function to get Windows Build data
function getBuildData(){
    // Create XHR object
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", transferComplete);
    xhr.open("GET",
        "./data/data.json");
    xhr.send();
}

// Windows Build data is retrieved, display it
function transferComplete(evt){
    buildData = JSON.parse(evt.srcElement.responseText);
    console.log(buildData.builds[0].health.daily);
    //document.getElementById("content").innerText = evt.srcElement.responseText;
    createBarChart();
}

function createBarChart(){
    // set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 80},
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
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("./data/data.json", function(error, data) {
  if (error) throw error;

  data = data.builds[0].health.daily
  // format the data
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.uniqueInsiders = +d.uniqueInsiders;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { 
      return d.date; }
      ));
  y.domain([0, d3.max(data, function(d) { 
      return d.uniqueInsiders; 
    })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});

}
