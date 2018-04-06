// Call like `node passworder.js myPassword` to make a hash
// Call like `node passworder.js myPassword "hashString"` to check a hash
//                                              ^^^--- You need to escape $ with \$, sorry!!
const bcrypt = require("bcryptjs");

if (process.argv.length == 3) {
  const password = process.argv[2];
  const hash = bcrypt.hashSync(password, 10);

  console.log(`${password} => ${hash}`);

} else if (process.argv.length == 4) {
  const password = process.argv[2];
  const hash = process.argv[3];
  const compare = bcrypt.compareSync(password, hash) ? "Match!" : "No match!";

  console.log(`${compare} ${hash} => ${password}`);

} else {
  console.log("See comments on instructions, yo");
}
