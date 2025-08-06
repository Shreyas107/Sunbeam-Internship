const express = require("express");
const pool = require("./db");

const app = express();

app.use(express.json());

app.get("/demo", (request, response) => {
  response.send("Hello World");
});

// GET: get all employees
app.get("/get-all-employees", (request, response) => {
  const sql = `SELECT * FROM employee`;

  pool.query(sql, (error, result) => {
    if (error) {
      return response.send(error);
    }

    return response.send(result);
  });
});

// GET: get all employees (with query parameters)
app.get("/all-employees", (request, response) => {
  const filter = Number(request.query.filter) || 5;

  console.log("filter: ", filter);

  const sql = `SELECT * FROM employee LIMIT ?`;

  pool.query(sql, [filter], (error, result) => {
    if (error) {
      return response.send(error);
    }

    return response.send(result);
  });
});

// GET: get employee by Id (with route params)
app.get("/get-employee/:empId", (request, response) => {
  const empId = request.params.empId;
  //   const { empId } = request.params;

  if (!empId) {
    return response.send("Emp Id is required");
  }

  const sql = `SELECT * FROM employee WHERE id = ?`;

  pool.query(sql, [empId], (error, result) => {
    if (error) {
      return response.send(error.sqlMessage);
    }

    if (result.length === 0) {
      return response.send("No Employee Found with ID: " + empId);
    }

    return response.send(result);
  });
});

// POST: add new employee
app.post("/add", (request, response) => {
  const { nameFromPostman, emailFromPostman } = request.body;

  const sql = `INSERT INTO employee (name, email) VALUES (?,?)`;

  pool.query(sql, [nameFromPostman, emailFromPostman], (error, result) => {
    if (error) {
      return response.send(error);
    }

    return response.status(201).send({
      status: "success",
      message: "Employee added Successfully with ID: " + result.insertId,
    });
  });
});

// PUT: update an employee by Id
app.put("/update/:empId", (request, response) => {
  const { empId } = request.params;
  const { nameFromPostman, emailFromPostman, salary } = request.body;

  const sql = `UPDATE employee 
            SET name = ?, email = ?, salary = ? 
            WHERE id = ?`;

  pool.query(
    sql,
    [nameFromPostman, emailFromPostman, salary, empId],
    (error, result) => {
      if (error) {
        return response.send(error);
      }

      console.log("result: ", result);

      if (result.affectedRows === 0) {
        return response.send({
          status: "success",
          message: "No Employee found with ID: " + empId,
        });
      }

      return response.send({
        status: "success",
        message: "Employee details updated Successfully with ID: " + empId,
      });
    }
  );
});

// DELETE: delete an employee
app.delete("/delete/:empId", (request, response) => {
  const { empId } = request.params;

  const sql = `DELETE FROM employee 
            WHERE id = ?`;

  pool.query(sql, [empId], (error, result) => {
    if (error) {
      return response.send(error);
    }

    console.log("result: ", result);

    if (result.affectedRows === 0) {
      return response.send({
        status: "success",
        message: "No Employee found with ID: " + empId,
      });
    }

    return response.send({
      status: "success",
      message: "Employee DELETED Successfully with ID: " + empId,
    });
  });
});

app.listen(4444, () => {
  console.log(`server started`);
});
