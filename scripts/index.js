var buildData = null;

document.addEventListener("DOMContentLoaded", function(){
    //Load Windows build data
    //Removing this call temporarily
    //getBuildData();
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
    console.log(buildData);
    document.getElementById("content").innerText = evt.srcElement.responseText;
}
