export default 'const { Collection } = require("discord.js"); \n' +
  'const {loadFiles} = require("../functions/fileLoader"); \n' +
  " \n" +
  "async function loadEvents(client) { \n" +
  '  const ascii = require("ascii-table"); \n' +
  '  const table = new ascii().setHeading("Events", "Status"); \n' +
  " \n" +
  "  await client.events.clear(); \n" +
  " \n" +
  '  const Files = await loadFiles("src/events"); \n' +
  "  Files.forEach((file) => { \n" +
  "    const event = require(file); \n" +
  "    const execute = (...args) => event.execute(...args, client); \n" +
  "    client.events.set(event.name, execute); \n" +
  " \n" +
  "    if (event.rest) { \n" +
  "      if (event.once) client.rest.on(event.name, execute); \n" +
  "      else client.rest.on(event.name, execute); \n" +
  "    } else { \n" +
  "      if (event.once) client.once(event.name, execute); \n" +
  "      else client.on(event.name, execute); \n" +
  "    } \n" +
  " \n" +
  '    table.addRow(event.name, "✅"); \n' +
  "  });" +
  " \n" +
  "  return console.log(table.toString()); \n" +
  "} \n" +
  " \n" +
  "module.exports = { loadEvents };";
