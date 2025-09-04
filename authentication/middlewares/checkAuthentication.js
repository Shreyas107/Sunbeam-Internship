const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { errorResponse } = require("../utils/apiResponse");

const checkAuthentication = (request, response, next) => {
  if (request.url === "/user/register" || request.url === "/user/login") {
    return next();
  }

  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.send(errorResponse("Token is Missing!"));
  }

  try {
    const token = authToken.split(" ")[1];
    // console.log("token: ", token);

    const decodedToken = jwt.verify(token, SECRET_KEY);
    // console.log("decodedToken: ", decodedToken);

    request.user = decodedToken;
    // console.log("user: ", request.user);
    console.log("current user role: ", request.user.role);

    return next();
  } catch (error) {
    return response.send(errorResponse("Invalid or Expired Token!"));
  }
};

const checkAdminRole = (request, response, next) => {
  // check if role is admin
  // if yes then allow the request

  if (request.user.role === "admin") {
    return next();
  }

  // if no then send an error message
  return response.send(errorResponse("UnAuthorized Access! Admins only"));
};

const checkCoordinatorRole = (request, response, next) => {
  // check if role is coordinator
  // if yes then allow the request

  if (request.user.role === "coordinator") {
    return next();
  }

  // if no then send an error message
  return response.send(errorResponse("UnAuthorized Access! Coordinator only"));
};

module.exports = {
  checkAuthentication,
  checkAdminRole,
};
