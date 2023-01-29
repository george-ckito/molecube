module.exports =
  "const {\n" +
  "  Client,\n" +
  "  GatewayIntentBits,\n" +
  "  Partials,\n" +
  "  Collection,\n" +
  '} = require("discord.js");\n' +
  "const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;\n" +
  "const { User, Message, GuildMember, ThreadMember } = Partials;\n" +
  "const client = new Client({\n" +
  "  intents: [Guilds, GuildMembers, GuildMessages],\n" +
  "  partials: [User, Message, GuildMember, ThreadMember]," +
  "});\n" +
  'const init = require("./util/index");\n' +
  'const config = require("../molecule.json");\n' +
  "\n" +
  "\n" +
  "(() => {" +
  "  init(client);" +
  "})" +
  "\n" +
  "client.login(config.token);\n";
