module.exports =
  'const {loadCommands} = require("../../util/handlers/commandHandler");\n' +
  "\n" +
  "module.exports = {\n" +
  '  name: "ready",\n' +
  "  once: true,\n" +
  "  execute(client) {\n" +
  "    loadCommands(client);\n" +
  "    client.user.setActivity(`With ${client.guilds.cache.size} guilds`);\n" +
  '    console.log("Bot is now online!")\n' +
  "  },\n" +
  "}\n";
