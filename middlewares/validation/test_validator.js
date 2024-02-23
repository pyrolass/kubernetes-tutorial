const { body } = require("express-validator");
const validate = require("./validate");

module.exports = {
  testValidator: [body("test"), validate],
};
