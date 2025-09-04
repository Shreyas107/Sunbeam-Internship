const express = require("express");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const pool = require("../config/db");
const { USER_TABLE, SECRET_KEY } = require("../config");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = express.Router();

// GET: TEST API
router.get("/test", (request, response) => {
  return response.send(successResponse("Testing user api"));
});

// POST: register a user
router.post("/register", (request, response) => {
  const { firstName, lastName, email, password } = request.body;

  const hashPassword = String(crypto.SHA256(password));

  // STEP 1: check is user already exists
  const checkSQL = `SELECT * FROM ${USER_TABLE}
    WHERE email = ?`;

  pool.query(checkSQL, [email], (error, result) => {
    if (error) return response.send(errorResponse(error));

    if (result.length > 0)
      return response.send(errorResponse("Email already exists."));

    // STEP 2: insert new user into database
    const insertSQL = `INSERT INTO ${USER_TABLE}
            (first_name, last_name, email, password)
            VALUES (?, ?, ?, ?)`;

    pool.query(
      insertSQL,
      [firstName, lastName, email, hashPassword],
      (error, insertResult) => {
        if (error) return response.send(errorResponse(error));

        return response.send(successResponse("Registrartion successful."));
      }
    );
  });
});

// POST: login user
router.post("/login", (request, response) => {
  const { email, password } = request.body;

  const hashPassword = String(crypto.SHA256(password));

  const sql = `SELECT * FROM ${USER_TABLE}
            WHERE email = ? AND password = ?`;

  pool.query(sql, [email, hashPassword], (error, result) => {
    if (error) return response.send(errorResponse(error));

    if (result.length === 0)
      return response.send(errorResponse("Invalid email or password!"));

    // console.log("result[0]: ", result[0]);
    const user = result[0];

    const payload = {
      userId: user.user_id,
      role: user.role,
      firstName: user.first_name,
    };

    // console.log("payload: ", payload);

    const token = jwt.sign(payload, SECRET_KEY);
    // console.log("token: ", token);

    return response.send(
      successResponse({
        token,
        message: "Login Successful",
      })
    );
  });
});

module.exports = router;
