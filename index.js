// Using inquirer npm package for user prompts.
const { prompt, default: inquirer } = require("inquirer");
// Including a logo created by asciiart-logo
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

  // Utilizing prompt() method from inquirer to show the user the question and the choices.
  function loadMainPrompts() {
    prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            {
                name: "View All Employees",
                value: "VIEW_EMPLOYEES"
              },
              {
                name: "View All Employees By Department",
                value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
              },
              {
                name: "View All Employees By Manager",
                value: "VIEW_EMPLOYEES_BY_MANAGER"
              },
              {
                name: "Add Employee",
                value: "ADD_EMPLOYEE"
              },
              {
                name: "Remove Employee",
                value: "REMOVE_EMPLOYEE"
              },
              {
                name: "Update Employee Role",
                value: "UPDATE_EMPLOYEE_ROLE"
              },
              {
                name: "Update Employee Manager",
                value: "UPDATE_EMPLOYEE_MANAGER"
              },
              {
                name: "View All Roles",
                value: "VIEW_ROLES"
              },
              {
                name: "Add Role",
                value: "ADD_ROLE"
              },
              {
                name: "Remove Role",
                value: "REMOVE_ROLE"
              },
              {
                name: "View All Departments",
                value: "VIEW_DEPARTMENTS"
              },
              {
                name: "Add Department",
                value: "ADD_DEPARTMENT"
              },
              {
                name: "Remove Department",
                value: "REMOVE_DEPARTMENT"
              },
              {
                name: "View Total Utilized Budget By Department",
                value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT"
              },
              {
                name: "Quit",
                value: "QUIT"
              }
        ]
      }
    ]).then(res => {
      let choice = res.choice;
      // Begins the swich statements and starts a new case. 
      // When the user chooses the prior options, then it will call the function. 
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
// findAllEmployees retrieves all employees from the database. Then displays it in the console. 
  function viewEmployees() {
    db.findAllEmployees()
    .then(([rows]) => {
        let employees =rows;
        console.log("\n");
        console.table(employees);
    })
    .then(() => loadMainPrompts());
  }

  // Retrieves departments from the database by calling dbFindAllDepartments. 
function viewEmployeesByDepartment() {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
          }));
// This creates an array of choices that are used in a prompt. The user can then select which department.
          prompt([
            {
              type: "list",
              name: "departmentId",
              message: "Which department would you like to see employees for?",
              choices: departmentChoices
            }
          ])
        // the departmentId is passed through as a parameter to db.FindAllEmployeesByDepartment which gathers all employees in the specific department.
            .then(res => db.findAllEmployeesByDepartment(res.departmentId))
            .then(([rows]) => {
              let employees = rows;
              console.log("\n");
              console.table(employees);
            })
            // The main Prompts are displayed once again.
            .then(() => loadMainPrompts())
        });
    }

    // This function allows the user to see the list of employees.
    function viewEmployeesByManager() {
        // retrieving employees from the database and stores it in the managers variable. 
        db.findAllEmployees()
          .then(([rows]) => {
            let managers = rows;
            // mapping the employees from the database 
            const managerChoices = managers.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
            }));

            // prompts the user to select the employee. Calling the choices: "managerChoices"
            prompt([
              {
                type: "list",
                name: "managerId",
                message: "Which employee do you want to see direct reports for?",
                choices: managerChoices
              }
            ])
            // Calling the db.findAllEmployeesBYManger with the selected manager's id.
              .then(res => db.findAllEmployeesByManager(res.managerId))
              .then(([rows]) => {
                let employees = rows;
                console.log("\n");
                if (employees.length === 0) {
                  console.log("The selected employee has no direct reports");
                } else {
                  console.table(employees);
                }
              })
              // Reloads MainPrompts.
              .then(() => loadMainPrompts())
          });
      }

      // this function is to remove an employee from the database. 
      function removeEmployee() {
        // retrieving a list of employees in the database.
        db.findAllEmployees()
          .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
            }));
      
            // prompts the user to select and asking them which employee to remove. 
            prompt([
              {
                type: "list",
                name: "employeeId",
                message: "Which employee do you want to remove?",
                choices: employeeChoices
              }
            ])
              .then(res => db.removeEmployee(res.employeeId))
              // Notifying that the employee has been removed.
              .then(() => console.log("The employee was removed from the database"))
              // Returning back to the MainPrompts.
              .then(() => loadMainPrompts())
          })
      }

      // This function updates the role of the employee in the db. 
      function updateEmployeeRole() {
        // retrieving employees from the database.
        db.findAllEmployees()
          .then(([rows]) => {
            let employees = rows;
            // mapping employees data with the list of choices
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
            }));
      
            // prompting the choices and then selecting an employee who needs to be updated.
            prompt([
              {
                type: "list",
                name: "employeeId",
                message: "Which employee's role do you want to update?",
                choices: employeeChoices
              }
            ])
              .then(res => {
                let employeeId = res.employeeId;
                // when employee is selected it then calls the findAllRoles to retrieve roles from db.
                db.findAllRoles()
                  .then(([rows]) => {
                    let roles = rows;
                    // mapping the roles data and the choices with the roleId
                    const roleChoices = roles.map(({ id, title }) => ({
                      name: title,
                      value: id
                    }));
      
                    // prompts if you want to reasign the employee 
                    prompt([
                      {
                        type: "list",
                        name: "roleId",
                        message: "Which role do you want to assign the selected employee?",
                        choices: roleChoices
                      }
                    ])
                      .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                      .then(() => console.log("Updated employee's role"))
                      .then(() => loadMainPrompts())
                  });
              });
          })
      }

      // updates the EmployeeManager
      function updateEmployeeManager() {
        // retrieving a list of employees from the DB
        db.findAllEmployees()
          .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
            }));
      
            // prompting the list and message in the choices employeeChoices.
            prompt([
              {
                type: "list",
                name: "employeeId",
                message: "Which employee's manager do you want to update?",
                choices: employeeChoices
              }
            ])
              .then(res => {
                let employeeId = res.employeeId;
                db.findAllPossibleManagers(employeeId)
                  .then(([rows]) => {
                    let managers = rows;
                    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
                      name: `${first_name} ${last_name}`,
                      value: id
                    }));
      
                    prompt([
                      {
                        type: "list",
                        name: "managerId",
                        message:
                          "Which employee do you want to set as manager for the selected employee?",
                        choices: managerChoices
                      }
                    ])
                      .then(res => db.updateEmployeeManager(employeeId, res.managerId))
                      .then(() => console.log("Updated employee's manager"))
                      .then(() => loadMainPrompts());
                  });
              });
          });
      }
      
      // finding all roles in the db and displays them.
      function viewRoles() {
        db.findAllRoles()
          .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
          })
          .then(() => loadMainPrompts());
      }
      
      // Creating a new role in the database
      function addRole() {
        // begins by findAllDepartments in the database.
        db.findAllDepartments()
          .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
              name: name,
              value: id
            }));
      
            // displaying the next set of questions for the user to answer.
            prompt([
              {
                name: "title",
                message: "Please enter the role's title below.."
              },
              {
                name: "salary",
                message: "Please enter the role's salary below."
              },
              {
                type: "list",
                name: "department_id",
                message: "Which role does the department belong to? Enter the department id below.",
                choices: departmentChoices
              }
            ])
              .then(role => {
                // creating the role.
                db.createRole(role)
                // adding the role to the db.
                  .then(() => console.log(`Added ${role.title} to the database`))
                  // Prompting the application to load the MainPrompts.
                  .then(() => loadMainPrompts())
              })
          })
      }

// When the user exits the application.
  function quit() {
    console.log("Goodbye!");
    process.exit();
  }
  