export default "const {\n" +
  "  ChatInputCommandInteraction,\n" +
  "  SlashCommandBuilder,\n" +
  '} = require("discord.js");\n' +
  "\n" +
  "module.exports = {\n" +
  "  data: new SlashCommandBuilder()\n" +
  '    .setName("ping")\n' +
  '    .setDescription("Replys with pong!"),\n' +
  "  /**\n" +
  "   * @param {ChatInputCommandInteraction} interaction\n" +
  "   */\n" +
  "  async execute(interaction, client, message, arguments) {\n" +
  '    message ? message.reply({ content: "Pong!" }) :interaction.reply({\n' +
  '      content: "Pong!",\n' +
  "    });\n" +
  "  },\n" +
  "};\n";
