export default 'const mongoose = require("mongoose");\n' +
  'const config = require("../../../molecube.json");\n' +
  "\n" +
  "module.exports = () => {\n" +
  "if (!config.database) return;\n" +
  "mongoose\n" +
  "  .connect(config.database, {\n" +
  "    // Database options\n" +
  "  })\n" +
  "  .then(() => {\n" +
  '    console.log("Connected to the database");\n' +
  "  });\n" +
  "}";
