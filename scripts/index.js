var buildData = null;
var detailedView = false;
var searchView = false;


// Array of JSON files we want to load
var jsonFiles = ["./data/17522_fbl_impressive.json", "./data/17521_rsmain.json", "./data/17522_fbl_appx.json", "./data/activity.json"];

document.addEventListener("DOMContentLoaded", function(){

    if (window.location.pathname == "/index.htm") {
      displayFavorites();

      searchView = false;
      detailedView = false;

    } else if (window.location.pathname.indexOf("fullDetails.htm") !== -1) {
      console.log("detailed view!");
      searchView = false;
      detailedView = true;

      var searchString = window.location.search.split("=")[1];
      var file = "./data/" + searchString + ".json"
      getBuildData(file);
    } else if (window.location.pathname.indexOf("searchResults.htm") !== -1) {
      console.log("Search view!");

      searchView = true;
      detailedView = false;

      //var searchString = new URLSearchParams(window.location.search).get("query");
      var searchString = window.location.search.split("=")[1];
      console.log("The thing we are searching for is: " + searchString);

      findResults(searchString);
    } else if (window.location.pathname == "/summaryPage.htm") {
      processData(jsonFiles);

      searchView = false;
      detailedView = false;
    }
});

// Identify which JSON files contain the data we are looking for!
function findResults(query) {
  var filteredResults = [];

  for (var i = 0; i < jsonFiles.length; i++) {
    var fileName = jsonFiles[i];

    if (fileName.indexOf(query) !== -1) {
      filteredResults.push(fileName);
    }
  }

  console.log(filteredResults);
  processData(filteredResults);
}

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

//
// Listen to clicks on the favorite icon
//
function setupFavoritesEvents() {
  var favorites = document.querySelectorAll(".favorite");

  for (var i = 0; i < favorites.length; i++) {
    var favorite = favorites[i];
    favorite.addEventListener("click", processFavorite, false);
  }
}

// keep track of all the files we currently have
// favorited and add/remove them
function processFavorite(e) {
  e.preventDefault();

  var favoriteFile = e.target.getAttribute("data-file");
  var favoritesArray;

  if (localStorage.getItem("favorites")) {
    console.log("creating favorites!");
    favoritesArray = JSON.parse(localStorage.getItem("favorites"));
  } else {
    favoritesArray = [];
  }

  if (favoritesArray.includes(favoriteFile)) {
    var index = favoritesArray.indexOf(favoriteFile);
    favoritesArray.splice(index, 1);

    var favoriteStar = document.querySelector(".favorite[data-file='" + favoriteFile + "']");
    favoriteStar.classList.toggle("hideFavorite");

  } else {
    favoritesArray.push(favoriteFile);
  }

  localStorage.setItem("favorites", JSON.stringify(favoritesArray));
}

// Store our important DOM elements
var template = document.querySelector("#dataContent");
var contentElement = document.querySelector("#content");
if(document.getElementById('dataViews')){
  contentElement = document.getElementById('dataViews');
}
// The entry point to what our app does
function processData(fileArray) {
  for (var i = 0; i < fileArray.length; i++) {
    var jsonFile = fileArray[i];
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

    var clonedElement = template.content.cloneNode(true);
    clonedElement.querySelector(".linkDetails").setAttribute("href", "fullDetails.htm?details=" + buildData.builds[0].branch.file);
    clonedElement.querySelector(".branchName").innerText = buildData.builds[0].branch.name;

    // deal with the favorite star
    var starElement = clonedElement.querySelector(".favorite");

    if (starElement) {
      starElement.setAttribute("data-file", evt.srcElement.dataFile);
    }

    var favoritesArray = [];

    if (localStorage.getItem("favorites")) {
      favoritesArray = JSON.parse(localStorage.getItem("favorites"));
    } else {
      console.log("No Favorites!");
    }

    for (var i = 0; i < favoritesArray.length; i++) {
      var favoriteFile = favoritesArray[i];

      if (favoriteFile == evt.srcElement.dataFile) {
        clonedElement.querySelector(".favorite").classList.toggle("hideFavorite");
      }
    }


    clonedElement.querySelector(".releaseValue").innerText = buildData.builds[0].build.releaseScore;
    clonedElement.querySelector(".hours").innerText = buildData.builds[0].build.hours;
    clonedElement.querySelector(".hotbugs").innerText = buildData.builds[0].build.hotbugs;
    clonedElement.querySelector(".triage").innerText = buildData.builds[0].build.triage;
    clonedElement.querySelector(".warnings").innerText = buildData.builds[0].build.warnings;
    clonedElement.querySelector(".arch").innerText = buildData.builds[0].build.platform;
    clonedElement.querySelector(".passrate").innerText = buildData.builds[0].build.passrate;

    //
    // NOTE: We don't want to send the entire JSON file again. We only
    //       need to send the parsed data. This is a TODO item that
    //       hasn't been addressed yet.
    //
    if (detailedView == true) {
      createBarChart(clonedElement.querySelector(".chart"), evt.srcElement.dataFile);
    }
    contentElement.appendChild(clonedElement);

    setupFavoritesEvents();
    //updateFavoriteStars();
}

function displayFavorites() {
  var favoritesArray;

  if (localStorage.getItem("favorites")) {
    favoritesArray = JSON.parse(localStorage.getItem("favorites"));
    processData(favoritesArray);
  } else {
    console.log("No Favorites!");
  }
}

//
// We want to visually differentiate builds you've favorited
// from builds you have not favorited
//
function updateFavoriteStars() {
  var favoritesArray;

  if (localStorage.getItem("favorites")) {
    favoritesArray = JSON.parse(localStorage.getItem("favorites"));

    for (var i = 0; i < favoritesArray.length; i++) {
      var favoriteFile = favoritesArray[i];
      var favoriteStar = document.querySelector(".favorite[data-file='" + favoriteFile + "']");
      favoriteStar.classList.toggle("hideFavorite");
    }
  }
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


//carousel sript
if(document.getElementById('dataViews')){
var dataviews = document.getElementById('dataViewWrapper');

var changeFactor = function(dir){
    var currentValue = Number(dataviews.getAttribute('data-datapos'));

 if(dir === "lower") {

  dataviews.setAttribute('data-datapos', (currentValue === 0?0:currentValue-1))
 }else{

  dataviews.setAttribute('data-datapos', (currentValue === 2?2:currentValue+1))

 }
 
}

///listeners
document.getElementById('left').addEventListener('click', function(){
  changeFactor('lower')
})
document.getElementById('right').addEventListener('click', function(){
  changeFactor('higher')
})





var mode = 'system';
function modeSwitch(ev) {

    mode = ev.target.displayText;
}
if (typeof Windows != 'undefined') {

    // Modify System Defaults to Only Show Volume and Next/Prev Track as per guidance.
    // https://docs.microsoft.com/en-us/windows/uwp/input-and-devices/windows-wheel-interactions


    //initilize dial
    var config = Windows.UI.Input.RadialControllerConfiguration.getForCurrentView();
    config.setDefaultMenuItems([Windows.UI.Input.RadialControllerSystemMenuItemKind.scroll]);
    var controller = Windows.UI.Input.RadialController.createForCurrentView();


    
    // Add our own item to respond to
    // var mi = Windows.UI.Input.RadialControllerMenuItem.createFromKnownIcon("Undo/Redo", Windows.UI.Input.RadialControllerMenuKnownIcon.undoRedo);
    // mi.addEventListener("invoked", modeSwitch);

    // Add two custom sections for the dial interface
    // If images do not show on Dial, change path to be absolute
    var mi2 = Windows.UI.Input.RadialControllerMenuItem.createFromIcon("Page Turns", Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(new Windows.Foundation.Uri("http://127.0.0.1:80/scroll.png")));
    var mi3 = Windows.UI.Input.RadialControllerMenuItem.createFromIcon("Prep Build", Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(new Windows.Foundation.Uri("http://127.0.0.1:80/button.png")));
  //push to controler
    controller.menu.items.push(mi2);
    controller.menu.items.push(mi3);

    mi2.addEventListener("invoked", modeSwitch);
    mi3.addEventListener('invoked', modeSwitch);
  //  controller.menu.items.push(mi);


    controller.addEventListener("buttonclicked", function (e) {
     if(mode !== 'Prep Build') return
     document.body.classList.toggle('build');
    });

    controller.addEventListener("rotationchanged", function (e) {
        if(mode !== 'Page Turns') return
        var changeDirection = e.detail[0].rotationDeltaInDegrees;
      if(changeDirection < 0){
        changeFactor('lower')
      }else{
        changeFactor('higher')

      }
      
      //  log("rotation changed: " + e.detail[0].rotationDeltaInDegrees + " in " + mode);
    });
 

}
















}//end check for last page 
