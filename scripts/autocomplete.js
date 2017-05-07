// File: autocomplete.js
// This file provides autocomplete functionality for the search box
'use strict';

var autoCompleteTerms = new Array();

// this method watches the search input box
function searchAutoComplete(evt){
    // Check that we have a couple of characters
    if(evt.target.value.length > 2){

    }
}

function addSearchTerm(term){
    autoCompleteTerms.push(term);
}

document.addEventListener("DOMContentLoaded", function(){
    // Add listener for the search box on the html page
    var searchBoxName = "searchField";

    document.getElementById(searchBoxName)
            .addEventListener("input", searchAutoComplete);
});