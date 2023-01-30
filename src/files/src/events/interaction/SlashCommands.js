export default 'const { ChatInputCommandInteraction } = require("discord.js");\n' +
  "\n" +
  "module.exports = {\n" +
  '  name: "interactionCreate",\n' +
  "  /**\n" +
  "   *\n" +
  "   * @param {ChatInputCommandInteraction} interaction\n" +
  "   */\n" +
  "  execute(interaction, client) {\n" +
  "    if (!interaction.isChatInputCommand()) return;\n" +
  "\n" +
  "    const command = client.commands.get(interaction.commandName);\n" +
  "    if (!command)\n" +
  "      return interaction.reply({\n" +
  '        content: "This command is outdated.",\n' +
  "        ephemeral: true,\n" +
  "      });\n" +
  "\n" +
  "    if (\n" +
  '      (command.developer && interaction.user.id !== "853123789847527454") ||\n' +
  '      (command.developer && interaction.user.id !== "793162309014781963")\n' +
  "    )\n" +
  "      return interaction.reply({\n" +
  '        content: "This command is only available to the developer.",\n' +
  "        ephemeral: true,\n" +
  "      });\n" +
  "\n" +
  "    command.execute(interaction, client);\n" +
  "  },\n" +
  "};";
