const express = require("express");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const pool = require("../config/db");
const { BOOK_TABLE } = require("../config");
const router = express.Router();

// test route
router.get("/demo1", (request, response) => {
  response.send(successResponse("Hello World!!!!!"));
});

// get all books
router.get("/all-books", (request, response) => {
  const sql = `SELECT * FROM ${BOOK_TABLE}`;

  pool.query(sql, (error, results) => {
    if (error) {
      return response.send(errorResponse(error));
    }

    if (results.length === 0) {
      return response.send(successResponse("No Books Found."));
    }

    return response.send(successResponse(results));
  });
});

// method1: update batch course by using update query
router.put("/update-course", (request, response) => {
  const { oldBatchId, oldCourseId, newBatchId, newCourseId } = request.body;
  //          1 Mar      1 DAC          2 AUG        2 DMC

  const sql = `UPDATE batch_courses 
        SET batch_id = ?, course_id = ?
        WHERE batch_id = ? AND course_id = ?`;

  pool.query(
    sql,
    [newBatchId, newCourseId, oldBatchId, oldCourseId],
    (error, result) => {
      if (error) return response.send(errorResponse(error));

      if (result.affectedRows === 0)
        return response.send(successResponse("No course found in that batch"));

      return response.send(
        successResponse("course updated into new batch successfully ")
      );
    }
  );
});

// method2: update batch course by deleting old record and inserting new record
router.put("/update-by-delete", (request, response) => {
  const { oldBatchId, oldCourseId, newBatchId, newCourseId } = request.body;
  //          2 Mar      2 DAC          1 AUG        1 DMC

  const deleteSql = `DELETE FROM batch_courses WHERE batch_id = ? AND course_id = ?`;
  const InsertSql = `INSERT INTO batch_courses (batch_id, course_id) VALUES (?, ?)`;

  // STEP 1: deleting old record
  pool.query(deleteSql, [oldBatchId, oldCourseId], (error, result) => {
    if (error) return response.send(errorResponse(error));

    if (result.affectedRows === 0)
      return response.send(successResponse("No course found in that batch"));

    // STEP 2: insertion of new record
    pool.query(InsertSql, [newBatchId, newCourseId], (error, result) => {
      if (error) return response.send(errorResponse(error));

      return response.send(
        successResponse("course updated into new batch successfully")
      );
    });
  });
});

module.exports = router;
