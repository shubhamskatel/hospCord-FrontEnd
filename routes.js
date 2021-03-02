const routes = require("next-routes")();

routes
  .add("/patient/new", "/patient/new")
  .add("/doctor/:address", "/doctor/viewDoctor")
  .add("/patient/:address", "/patient/patHome")
  .add("/patient/ipfs/:address", "/patient/ipfs/newRecord")
  .add("/records/:address", "/records/recordDetail");

module.exports = routes;
