module.exports =
  'const {loadFiles} = require("../functions/fileLoader");\n' +
  "\n" +
  "async function loadCommands(client) {\n" +
  '  const ascii = require("ascii-table");' +
  '  const table = new ascii().setHeading("Commands", "Status");\n' +
  "\n" +
  "  await client.commands.clear;\n" +
  "\n" +
  "  let commandsArray = [];\n" +
  "\n" +
  '  const Files = await loadFiles("src/commands");\n' +
  "\n" +
  "  Files.forEach((file) => {\n" +
  "    const command = require(file);\n" +
  "    client.commands.set(command.data.name, command);\n" +
  "\n" +
  "    commandsArray.push(command.data.toJSON());\n" +
  "\n" +
  '    table.addRow(command.data.name, "✅");\n' +
  "  });\n" +
  "\n" +
  "  client.application.commands.set(commandsArray);\n" +
  "  return console.log(table.toString());\n" +
  "}\n" +
  "\n" +
  "module.exports = { loadCommands };\n";
