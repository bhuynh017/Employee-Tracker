const connection = require("./connection");

// Can be used potentially later to create objects that represent a connection to a database.
class DB {
    constructor(connection) {
        this.connection = connection;
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

   // this is a method and it removes an emplpyee with the given ID.  
   removeEmployee(employeeId) {
    // the promise() method is to execute teh SQL query which is passed to the query() method. This is used to delete an employee from employee table by using the WHERE clause.
    return this.connection.promise().query(
      "DELETE FROM employee WHERE id = ?",
      employeeId
    );
  }

  // This query is used to update the role_id of an employee by using the WHERE clause and matching the id of the employee with the employeeId. 
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }

  // Similar to the above but updating the EmployeeManager.
  updateEmployeeManager(employeeId, managerId) {
    return this.connection.promise().query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
    );
  }

  // this method is used to select all the columns from the role table and find the data from department. 
  findAllRoles() {
    return this.connection.promise().query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }

  // Create a new role
  createRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  