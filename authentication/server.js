const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const { PORT } = require("./config");

const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const routeNotFound = require("./middlewares/routeNotFound");
const { checkAuthentication } = require("./middlewares/checkAuthentication");

// global middlewares
app.use(express.json());
app.use(cors());
app.use(checkAuthentication);
app.use(morgan("dev"));
app.use(helmet());

// custom logger
// const logger = (request, response, next) => {
//   // console.log("requ");

//   console.log("request.url: ", request.url);
//   next();
// };
// app.use(logger);

// routes
app.use("/book", bookRoutes);
app.use("/user", userRoutes);

// route not found
app.use(routeNotFound);

app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
