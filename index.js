// Using inquirer npm package for user prompts.
const { prompt, default: inquirer } = require("inquirer");
// Including a logo created by asciiart-logo
const logo = require('asciiart-logo');
const db = require("./db");
require("console.table");

init();

// Displaying logo text and loading in the main prompts
function init() {
    const logoText = logo({ name: "Welcome to Employee Manager!" }).render();
  
    console.log(logoText);
  
    loadHomePage();
  }

  // Utilizing prompt() method from inquirer to show the user the question and the choices.
  function loadHomePage() {
    prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do? Please choose from the following.",
        choices: [
            {
                name: "View All Employees",
                value: "VIEW_EMPLOYEES"
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
          case "ADD_EMPLOYEE":
          addEmployee();
          break;        
          case "REMOVE_EMPLOYEE":
          removeEmployee();
          break;        
          case "UPDATE_EMPLOYEE_ROLE":
          updateEmployeeRole();
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
    .then(() => loadHomePage());
  }

  // creating function to add a new employee.
      function addEmployee() {
        // displaying questions for the user to answer.
        prompt([
          {
            name: "first_name",
            message: "What is the employee's first name?"
          },
          {
            name: "last_name",
            message: "What is the employee's last name?"
          }
        ])
          .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;
      
            // queries the data and creates an array of choice from the returned data.

            db.findAllRoles()
              .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title }) => ({
                  name: title,
                  value: id
                }));
      
                // asking further questions on what is the employee's role.
                prompt({
                  type: "list",
                  name: "roleId",
                  message: "What is the employee's role?",
                  choices: roleChoices
                })
                  .then(res => {
                    let roleId = res.roleId;
      
                    db.findAllEmployees()
                      .then(([rows]) => {
                        let employees = rows;
                        const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                          name: `${first_name} ${last_name}`,
                          value: id
                        }));
      
                        managerChoices.unshift({ name: "None", value: null });
      
                        prompt({
                          type: "list",
                          name: "managerId",
                          message: "Who is the employee's manager?",
                          choices: managerChoices
                        })
                          .then(res => {
                            let employee = {
                              manager_id: res.managerId,
                              role_id: roleId,
                              first_name: firstName,
                              last_name: lastName
                            }
      
                            db.createEmployee(employee);
                          })
                          .then(() => console.log(
                            `Added ${firstName} ${lastName} to the database`
                          ))
                          .then(() => loadHomePage())
                      })
                  })
              })
          })
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
                      .then(() => loadHomePage())
                  });
              });
          })
      }

            function viewDepartments() {
        db.findAllDepartments()
          .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
          })
          .then(() => loadMainPrompts());
      }
      
      // Add a department
      function addDepartment() {
        prompt([
          {
            name: "name",
            message: "What is the name of the department?"
          }
        ])
          .then(res => {
            let name = res;
            db.createDepartment(name)
              .then(() => console.log(`Added ${name.name} to the database`))
              .then(() => loadHomePage())
          })
      }
      
      // creating function to removeDepartment.
      function removeDepartment() {
        // accessing db to findAllDepartments.
        db.findAllDepartments()
          .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
              name: name,
              value: id
            }));
      
            // displaying set of quetsions to remove the department.
            prompt({
              type: "list",
              name: "departmentId",
              message:
                "Which department would you like to remove?",
              choices: departmentChoices
            })
            // prompts the user that the department has been removed.
              .then(res => db.removeDepartment(res.departmentId))
              .then(() => console.log(`Removed department from the database`))
              .then(() => loadHomePage())
          })
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
                  .then(() => loadHomePage())
              })
          })
      }

      // creating function to removeRoles
      function removeRole() {
        // calling db to findallroles first.
        db.findAllRoles()
          .then(([rows]) => {
            let roles = rows;
            // mapping the roles to the id and title.
            const roleChoices = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));
      
            // displaying questions which the user needs to do in order to proceed with application.
            prompt([
              {
                type: "list",
                name: "roleId",
                message:
                  "Which employee's role do you want to remove?",
                choices: roleChoices
              }
            ])
              .then(res => db.removeRole(res.roleId))
              .then(() => console.log("Removed employee's role from the database"))
              .then(() => loadHomePage())
          })
      }
      
// When the user exits the application.
  function quit() {
    console.log("You have exited the application. Thank you!");
    process.exit();
  }
  