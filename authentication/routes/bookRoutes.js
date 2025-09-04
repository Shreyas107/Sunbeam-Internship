const express = require("express");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const pool = require("../config/db");
const { BOOK_TABLE } = require("../config");
const { checkAdminRole } = require("../middlewares/checkAuthentication");
const router = express.Router();

// GET: fetch all books
router.get("/all", (request, response) => {
  // console.log("userId: ", request.user.userId);
  // console.log("role: ", request.user.role);
  // console.log("firstName: ", request.user.firstName);
  const sql = `SELECT * FROM ${BOOK_TABLE}`;

  pool.query(sql, [], (error, result) => {
    if (error) return response.send(errorResponse(error));

    if (result.length === 0)
      return response.send(successResponse("No books found."));

    return response.send(successResponse(result));
  });
});

// file / module level middleware
// router.use(checkAdminRole);

// route level middleware
// POST: add a new book
router.post("/add", checkAdminRole, (request, response) => {
  return response.send(successResponse("Adding a new book."));
});

// PUT: update a book by bookId
router.put("/update", checkAdminRole, (request, response) => {
  return response.send(successResponse("Updating a book."));
});

// DELETE: delete a book by bookId
router.delete("/delete", checkAdminRole, (request, response) => {
  return response.send(successResponse("Deleting a book."));
});

module.exports = router;
