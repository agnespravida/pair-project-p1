const bcrypt = require("bcryptjs")
function comparePassword(input, hash){
  return bcrypt.compareSync(input, hash)
}

module.exports = comparePassword