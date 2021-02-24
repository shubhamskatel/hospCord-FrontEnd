const routes = require("next-routes")();

routes
  .add("/patient/new", "/patient/new")
  .add("/doctor/:address", "/doctor/viewDoctor")
  .add("/patient/:address", "/patient/patHome")
  .add("/patient/records/:address", "/patient/records/newRecord");

module.exports = routes;
