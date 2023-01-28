const { prompt } = require("inquirer");
const logo = require('asciiart-logo');
const db = require("./db");
require("console.table");

init();

// Displaying logo text and loading in the main prompts
function init() {
    const titleText =({ name: "Employee Manager" }).render();

    console.log(titleText);

    loadMainPrompts();
}

function loadMainPrompts() {
    prompt
}