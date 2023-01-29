module.exports =
  'const {Collection} = require("discord.js");\n' +
  'const database = require("./functions/database");\n' +
  'const loadEvents = require("./handlers/eventHandler");\n' +
  "\n" +
  "module.exports = (client) => {\n" +
  "  client.events = new Collection();\n" +
  "  client.commands = new Collection();\n" +
  "  loadEvents.loadEvents(client);\n" +
  "  database();\n" +
  "};";
