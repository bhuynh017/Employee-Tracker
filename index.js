const { prompt, default: inquirer } = require("inquirer");
const logo = require('asciiart-logo');
const db = require("./db");
require("console.table");

init();

// Displaying logo text and loading in the main prompts
function init() {
    const logoText = logo({ name: "Employee Manager" }).render();
  
    console.log(logoText);
  
    loadMainPrompts();
  }

  function loadMainPrompts() {
    prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all employees by department",
            "View all employees by manager",
            "Add employee",
            "Add Department",
            "Add Role",
            "Remove employee",
            "Update employee role",
            "Update employee manager"
        ]
      }
    ]).then(res => {
      let choice = res.choice;
      // Call the appropriate function depending on what the user chose
      switch (choice) {
        case "VIEW_EMPLOYEES":
          viewEmployees();
          break;
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
          viewEmployeesByDepartment();
          break;
        case "VIEW_EMPLOYEES_BY_MANAGER":
          viewEmployeesByManager();
          break;
        case "ADD_EMPLOYEE":
          addEmployee();
          break;
        case "REMOVE_EMPLOYEE":
          removeEmployee();
          break;
        case "UPDATE_EMPLOYEE_ROLE":
          updateEmployeeRole();
          break;
        case "UPDATE_EMPLOYEE_MANAGER":
          updateEmployeeManager();
          break;
        case "VIEW_DEPARTMENTS":
          viewDepartments();
          break;
        case "ADD_DEPARTMENT":
          addDepartment();
          break;
        case "REMOVE_DEPARTMENT":
          removeDepartment();
          break;
        case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
          viewUtilizedBudgetByDepartment();
          break;
        case "VIEW_ROLES":
          viewRoles();
          break;
        case "ADD_ROLE":
          addRole();
          break;
        case "REMOVE_ROLE":
          removeRole();
          break;
        default:
          quit();
      }
    }
    )
  }