const bcrypt = require("bcryptjs")

function hashPassword(rawPassword){
  let salt = bcrypt.genSaltSync(10);
  let hashedPassword = bcrypt.hashSync(rawPassword, salt);
  return hashedPassword
}

module.exports = hashPassword