import chalk from "chalk";
import fs from "fs";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
export class generate {
  constructor(botInfo) {
    this.botInfo = botInfo;
    this.events = [
      "applicationCommandPermissionsUpdate",
      "cacheSweep",
      "channelCreate",
      "channelDelete",
      "channelPinsUpdate",
      "channelUpdate",
      "ready",
      "debug",
      "guildBanAdd",
      "guildBanRemove",
      "guildCreate",
      "guildDelete",
      "emojiCreate",
      "emojiDelete",
      "emojiUpdate",
      "guildIntegrationsUpdate",
      "guildMemberAdd",
      "guildMemberAvailable",
      "guildMemberRemove",
      "guildMembersChunk",
      "guildMemberUpdate",
      "roleCreate",
      "roleDelete",
      "roleUpdate",
      "guildScheduledEventCreate",
      "guildScheduledEventDelete",
      "guildScheduledEventUpdate",
      "guildScheduledEventUserAdd",
      "guildScheduledEventUserRemove",
      "stickerCreate",
      "stickerDelete",
      "stickerUpdate",
      "guildUnavailable",
      "guildUpdate",
      "interactionCreate",
      "invalidated",
      "inviteCreate",
      "inviteDelete",
      "messageDeleteBulk",
      "messageCreate",
      "messageDelete",
      "messageReactionAdd",
      "messageReactionRemove",
      "messageReactionRemoveAll",
      "messageReactionRemoveEmoji",
      "messageUpdate",
      "presenceUpdate",
      "shardDisconnect",
      "shardError",
      "shardReady",
      "shardReconnecting",
      "shardResume",
      "stageInstanceCreate",
      "stageInstanceDelete",
      "stageInstanceUpdate",
      "threadCreate",
      "threadDelete",
      "threadListSync",
      "threadMembersUpdate",
      "threadMemberUpdate",
      "threadUpdate",
      "typingStart",
      "userUpdate",
      "voiceServerUpdate",
      "voiceStateUpdate",
      "warn",
      "webhookUpdate",
    ];
  }
  async prompt() {
    const item = await inquirer.prompt({
      type: "list",
      name: "item",
      message: "What do you want to generate?",
      choices: ["Command", "Event"],
    });
    switch (item.item) {
      case "Command": {
        const name = await inquirer.prompt({
          type: "input",
          name: "name",
          message: "Enter the command's name",
        });
        const category = await inquirer.prompt({
          type: "input",
          name: "category",
          message: "Enter the command's category",
        });
        const description = await inquirer.prompt({
          type: "input",
          name: "description",
          message: "Enter the command's description",
        });
        this.generateCommand(
          name.name,
          description.description,
          category.category
        );
        break;
      }
      case "Event": {
        const events = await inquirer.prompt({
          type: "checkbox",
          name: "event",
          message: "Choose your events",
          choices: this.events,
        });
        let spinner = createSpinner("Creating (the) event(s)...").start();
        events.forEach((event) => {
          this.generateEvent(event);
        });
        sleep(3000);
        spinner.success("Created (the) event(s)!");
      }
    }
  }
  async generateCommand(name, description, category) {
    if (!fs.existsSync(`${process.cwd()}/molecule.json`)) {
      return console.log(
        chalk.red("There's no molecule project initialized in this directory")
      );
    }
    const command =
      "const {\n" +
      "  ChatInputCommandInteraction,\n" +
      "  SlashCommandBuilder,\n" +
      '} = require("discord.js");\n' +
      "\n" +
      "module.exports = {\n" +
      "  data: new SlashCommandBuilder()\n" +
      `    .setName(\"${name}\")\n` +
      `    .setDescription(\"${description}\"),\n` +
      "  /**\n" +
      "   * @param {ChatInputCommandInteraction} interaction\n" +
      "   */\n" +
      "  async execute(interaction, client, message, arguments) {\n" +
      "    // Do your stuff\n" +
      "  },\n" +
      "};\n";

    fs.writeFileSync(
      `${process.cwd()}/src/commands/${category || ""}/${name}.js`,
      command
    );
    let spinner = createSpinner("Creating the command...").start();
    sleep(3000);
    spinner.success("Created the command!");
  }
  async generateEvent(event) {
    if (!fs.existsSync(`${process.cwd()}/molecule.json`)) {
      return console.log(
        chalk.red("There's no molecule project initialized in this directory")
      );
    }
    const event =
      `// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-${event}\n` +
      "module.exports = {\n" +
      " name: '{name}',\n" +
      " //Change it to true if you want the event to execute only one time\n" +
      " once: false,\n" +
      " async execute(element) {\n" +
      '     console.log("Event Executed")\n' +
      " }\n" +
      "}";

    fs.writeFileSync(`${process.cwd()}/src/events/${event}.js`, event);
  }
}
