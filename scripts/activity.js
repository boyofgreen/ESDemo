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
    activity.setAttribute("id","activity" + index);

    var line1 = document.createElement("div");

    var dev = document.createElement("span");
    dev.setAttribute("class", "dev");
    dev.innerHTML = "<b>Dev</b>: " + activityData.code[index].dev;
    
    var branch = document.createElement("span");
    branch.setAttribute("class", "branch");
    branch.innerHTML = "&nbsp;<b>Branch</b>: " + activityData.code[index].branch;

    line1.appendChild(dev);
    line1.appendChild(branch);

    var line2 = document.createElement("div");

    var locAdded = document.createElement("span");
    locAdded.setAttribute("class", "locAdded");
    locAdded.innerHTML = "<b>loc(+)</b>: " + activityData.code[index].locAdded;

    var locRemoved = document.createElement("span");
    locRemoved.setAttribute("class", "locRemoved");
    locRemoved.innerHTML = "&nbsp;<b>loc(-)</b>: " + activityData.code[index].locRemoved;
    
    line2.appendChild(locAdded);
    line2.appendChild(locRemoved);

    activity.appendChild(line1);
    activity.appendChild(line2);

    var list = document.getElementById("activityFeed");
    document.getElementById("activityFeed").insertBefore(activity, list.childNodes[0]);

    setTimeout(showActivity,getRandomInt(3000,12000),index+1);
}

function activityDataTransferComplete(evt){
    activityData = JSON.parse(evt.srcElement.responseText);

    setTimeout(showActivity,1000,0);
}



document.addEventListener("DOMContentLoaded", function() {
    //Load Activity Data
    getActivityData('./data/activity.json');
});
