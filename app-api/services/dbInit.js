const testSeeder = require("../seed/testSeeder");
const { connect } = require("../services/db.js");

const initDb = async () => {
  await connect();
  testSeeder();
};

module.exports = initDb;
