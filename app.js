const express = require("express");
const ExpressError = require("./expressError");
const app = express();

app.use(express.json());

const companiesRoutes = require("./routes/companies");
const invoicesRoutes = require("./routes/invoices");
const industriesRoutes = require("./routes/industries");

app.use("/companies", companiesRoutes);
app.use("/invoices", invoicesRoutes);
app.use("/industries", industriesRoutes);

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass err to the next middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status,
    },
  });
});

module.exports = app;
