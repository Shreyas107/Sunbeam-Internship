const express = require("express");

const app = express();

// JSON Obj
// {   key: "value" }

// routes
app.get("/test", (request, response) => {
  response.send("Hello From my Server");
});

app.get("/test1", (request, response) => {
  response.json({
    status: "success",
    message: "Hello from server",
  });
});

app.get("/test2", (request, response) => {
  response.send({
    status: "success",
    message: "Hello from server",
  });
});

// route with route param
app.get("/test3/:userName", (request, response) => {
  const name = request.params.userName;

  response.send({
    status: "success",
    message: "Hello from User: " + name,
  });
});

// route with query parameters
app.get("/test4", (request, response) => {
  const name = request.query.userName || "user";

  response.send({
    status: "success",
    message: "Hello from User: " + name,
  });
});

app.listen(4444, () => {
  console.log(`Server Started`);
});

// loclhost: 127.0.0.1
