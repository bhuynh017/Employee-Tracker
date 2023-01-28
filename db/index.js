const connection = require("./connection");

// Can be used potentially later to create objects that represent a connection to a database.
class DB {
    constructor(connection) {
        this.connection = connection;
    }
}

// Using the promise method form the connection property to initate the SQL query. 
findAllEmployees() {
    return this.connection.promise().query(
        // Selecting all the columns in the employee table and retrive the data from role and department and joining them on the role_ID and dept_ID. 
        // This method returns the promise that is returned by the query() method. 
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  // this is a method and it is to create a new eomployee. Using the promise() method to initiate the SQL query. Then it is used to insert an new employee.
  // the SET ? = insert the data into the table 
  createEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee);
  }

