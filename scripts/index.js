var buildData = null;
var detailedView = false;

document.addEventListener("DOMContentLoaded", function(){
    //Load Windows build data
    //Removing this call temporarily
    //getBuildData();
    if (window.location.pathname == "/index.htm") {
      processData();
    } else if (window.location.pathname.indexOf("fullDetails.htm") !== -1) {
      console.log("detailed view!");
      detailedView = true;

      var urlParams = new URLSearchParams(window.location.search);
      var file = "./data/" + urlParams.get("details") + ".json"
      getBuildData(file);
    }
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

function getDetailedBuildData(file) {
  console.log("File: " + file);
}

// Store our important DOM elements
var template = document.querySelector("#dataContent");
var contentElement = document.querySelector("#content");

// Array of JSON files we want to load
var jsonFiles = ["./data/17522_fbl_impressive.json", "./data/17521_rsmain.json", "./data/17522_fbl_appx.json"]

// The entry point to what our app does
function processData() {
  for (var i = 0; i < jsonFiles.length; i++) {
    var jsonFile = jsonFiles[i];
    getBuildData(jsonFile);
  }
}

// Sample function to get Windows Build data
function getBuildData(file) {
    // Create XHR object
    var xhr = new XMLHttpRequest();
    xhr.dataFile = file;
    xhr.addEventListener("load", transferComplete);
    xhr.open("GET", file);
    xhr.send();
}

// Windows Build data is retrieved, display it
function transferComplete(evt) {
    buildData = JSON.parse(evt.srcElement.responseText);

    clonedElement = template.content.cloneNode(true);
    clonedElement.querySelector(".linkDetails").setAttribute("href", "fullDetails.htm?details=" + buildData.builds[0].branch.file);
    clonedElement.querySelector(".branchName").innerText = buildData.builds[0].branch.name;
    clonedElement.querySelector(".releaseValue").innerText = buildData.builds[0].build.releaseScore;
    clonedElement.querySelector(".buildNumber").innerText = buildData.builds[0].build.revision;

    //
    // NOTE: We don't want to send the entire JSON file again. We only
    //       need to send the parsed data. This is a TODO item that
    //       hasn't been addressed yet.
    //
    if (detailedView == true) {
      createBarChart(clonedElement.querySelector(".chart"), evt.srcElement.dataFile);
    }
    contentElement.appendChild(clonedElement);
}

function createBarChart(targetElement, jsonData) {

  // set the dimensions and margins of the graph
  var margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 80
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

    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
      .call(d3.axisLeft(y));

  });

}
