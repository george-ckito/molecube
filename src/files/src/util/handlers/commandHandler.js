export default 'const {loadFiles} = require("../functions/fileLoader");\n' +
  "\n" +
  "async function loadCommands(client) {" +
  '  const ascii = require("ascii-table");' +
  '  const table = new ascii().setHeading("Commands", "Status");' +
  "" +
  "  await client.commands.clear;" +
  "" +
  "  let commandsArray = [];" +
  "" +
  '  const Files = await loadFiles("src/commands");' +
  "" +
  "  Files.forEach((file) => {" +
  "    const commandFile = require(file);" +
  "    //just slash" +
  "    client.commands.set(commandFile.data.name, commandFile);" +
  "    commandsArray.push(commandFile.data.toJSON());" +
  '    table.addRow(commandFile.data.name, "✅");' +
  "    let commandName = commandFile.data.name;" +
  "    //now shit" +
  "" +
  "    let {" +
  '      expectedArgs = "",' +
  "      minArgs = 0," +
  "      maxArgs = null," +
  "      execute," +
  "    } = commandFile;" +
  "" +
  "    /**" +
  "     * @param {Message} message" +
  "     */" +
  '    client.on("messageCreate", (message) => {' +
  "      const { member, content, guild } = message;" +
  "      /**" +
  "       * @param {String} alias" +
  "       */" +
  "      const command = `!${commandName.toLowerCase()}`;" +
  "      if (" +
  "        content.toLowerCase().startsWith(`${command} `) ||" +
  "        content.toLowerCase() === command" +
  "      ) {" +
  "        if (" +
  "          commandFile.developer &&" +
  "          message &&" +
  '          message.author.id != "853123789847527454" &&' +
  '          message.author.id != "988250131650445352" &&' +
  '          message.author.id != "793162309014781963"' +
  "        ) {" +
  "          const devEmbed = new EmbedBuilder()" +
  '            .setTitle("Error")' +
  '            .setColor("DarkRed")' +
  "            .setDescription(" +
  '              "This command is only available to the developer."' +
  "            )" +
  "            .setTimestamp();" +
  "          return message.reply({" +
  "            embeds: [devEmbed]," +
  "          });" +
  "        }" +
  "        // A command has been ran" +
  "        const arguments = content.split(/[ ]+/);" +
  "" +
  "        // Remove the command which is the first index" +
  "        arguments.shift();" +
  "" +
  "        // Ensure we have the correct number of arguments" +
  "        if (" +
  "          arguments.length < minArgs ||" +
  "          (maxArgs !== null && arguments.length > maxArgs)" +
  "        ) {" +
  "          message.reply(" +
  "            `Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`" +
  "          );" +
  "          return;" +
  "        }" +
  "" +
  "        // Handle the custom command code" +
  "        execute(null, client, message, arguments);" +
  "      }" +
  "      // Split on any number of spaces" +
  "    });" +
  "  });" +
  "" +
  "  client.application.commands.set(commandsArray);" +
  "  return console.log(table.toString());" +
  "};" +
  '"n' +
  "module.exports = { loadCommands };\n";
+"";
