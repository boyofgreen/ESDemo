// File: Activity.js
// This file simulates a code activity feed
'use strict'
var activityData = null;

// Sample function to get Windows Build data
function getActivityData(file) {
    // Create XHR object
    var xhr = new XMLHttpRequest();
    xhr.dataFile = file;
    xhr.addEventListener("load", activityDataTransferComplete);
    xhr.open("GET", file);
    xhr.send();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showActivity(index){
    if(index == activityData.code.length - 1) {
        index = 0;
    }
    var activity = document.createElement("div");
    activity.setAttribute("class","activity");

    var dev = document.createElement("div");
    dev.textContent = activityData.code[index].dev;
    
    activity.appendChild(dev);
    var list = document.getElementById("activityFeed");
    document.getElementById("activityFeed").insertBefore(activity, list.childNodes[0]);

    setTimeout(showActivity,getRandomInt(3000,6000),index+1);
}

function activityDataTransferComplete(evt){
    activityData = JSON.parse(evt.srcElement.responseText);

    setTimeout(showActivity,1000,0);
}



document.addEventListener("DOMContentLoaded", function() {
    //Load Activity Data
    getActivityData('./data/activity.json');
});
