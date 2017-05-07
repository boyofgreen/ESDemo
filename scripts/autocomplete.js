// File: autocomplete.js
// This file provides autocomplete functionality for the search box
'use strict';

var autoCompleteTerms = new Array();
var searchBoxName = "searchField";

// this method watches the search input box
function searchAutoComplete(evt){
    var currentTerms = new Array();
    // Iterate through autocomplete terms
    if(evt.target.value.length > 0) {
        autoCompleteTerms.find((term) => {
            // Check for partial matches
            if(term.substring(0,evt.target.value.length).toLowerCase() === evt.target.value.toLowerCase()) {
                currentTerms.push(term);
            }
        })
    };

    // Show all matching terms
    displayAutoComplete(currentTerms);
}

function displayAutoComplete(terms){
    // Create an anchor element
    var list = document.createElement("div");
    // list.setAttribute("class","autolistContainer");
    // Iterate through all matching terms
    for(i = 0; i < terms.length; i++) {
        var item = document.createElement("div");
        item.setAttribute("class", "autolist");
        item.textContent = terms[i];
        item.addEventListener("click", doSearch);
        // Add to the list of options
        list.appendChild(item);
    }
    // Reset the inner HTML
    document.getElementById("searchAutoComplete").innerHTML = "";
    // Update with new list
    document.getElementById("searchAutoComplete").appendChild(list);

}

//TODO: check for Arrow down and up keys
//TODO: handle enter

function addSearchTerm(t){
    var exists = autoCompleteTerms.indexOf(t);
    if(exists === -1) {
        autoCompleteTerms.push(t);
    }
}

function doSearch(evt) {
    document.getElementById(searchBoxName).value = evt.target.textContent;
    document.getElementById(searchBoxName).form.submit();
}

function checkForArrowKeys(evt){
    //TODO: handle arrows
}

document.addEventListener("DOMContentLoaded", function(){
    // Add listener for the search box on the html page
    document.getElementById(searchBoxName)
            .addEventListener("input", searchAutoComplete);

    document.getElementById(searchBoxName)
            .addEventListener("keypress", checkForArrowKeys);
});