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

function showActiviy(){
    
}

function activityDataTransferComplete(evt){
    activityData = JSON.parse(evt.srcElement.responseText);

    showActivity();
}

document.addEventListener("DOMContentLoaded", function() {
    //Load Activity Data
    getActivityData('./data/activity.json');
});
