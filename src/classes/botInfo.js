import path from "path";
import fs from "fs";
import chalk from "chalk";
import packageJSON from "../../package.json" assert { type: "json" };
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import cp from "child_process";
import files from "../files";
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export class bot {
  constructor() {
    // console.log({
    //   projectName: this.projectName,
    //   language: this.language,
    //   packageManager: this.packageManager,
    //   token: this.token,
    //   mongodb: this.mongodb,
    // });
    // this.prompt();
    // this.createDirectories();
    // this.createFiles();
  }
  async prompt() {
    const title = chalk.blueBright(`Molecule v${packageJSON.version}`);
    console.log(title);
    const projectName = await inquirer.prompt({
      name: "projectName",
      type: "input",
      message: "What's the bot's name?",
    });

    // const language = await inquirer.prompt({
    //   name: "language",
    //   type: "list",
    //   message: "Select your bot's language",
    //   choices: ["JavaScript", "Typescript ( Not working yet! )"],
    // });

    const packageManager = await inquirer.prompt({
      name: "packageManager",
      type: "list",
      message: "Select your package manager",
      choices: ["Yarn", "Npm"],
    });

    const description = await inquirer.prompt({
      name: "description",
      type: "input",
      message: "Enter bot's description",
    });

    const token = await inquirer.prompt({
      name: "token",
      type: "input",
      message: "What's the bot's token?",
    });

    const mongodb = await inquirer.prompt({
      name: "mongodb",
      type: "input",
      message:
        "Enter your MongoDB URI (if you don't have one, just leave this default)",
    });

    this.projectName = projectName.projectName;
    // this.language = language.language;
    this.packageManager = packageManager.packageManager;
    this.description = description.description;
    this.token = token.token;
    this.mongodb = mongodb.mongodb;
    return {
      name: this.projectName,
      version: "1.0.0",
      description: this.description,
      main: "src/index.js",
      author: process.env.USER,
      license: "MIT",
      private: false,
    };

    console.log(this);
  }

  async createDirectories() {
    fs.mkdirSync(`${process.cwd()}/${this.projectName}`);
    fs.mkdirSync(`${process.cwd()}/${this.projectName}/src`);
    fs.mkdirSync(`${process.cwd()}/${this.projectName}/src/commands`);
    fs.mkdirSync(`${process.cwd()}/${this.projectName}/src/events`);
    fs.mkdirSync(`${process.cwd()}/${this.projectName}/src/events/interaction`);
    fs.mkdirSync(`${process.cwd()}/${this.projectName}/src/events/client`);
    fs.mkdirSync(`${process.cwd()}/${this.projectName}/src/util`);
    fs.mkdirSync(`${process.cwd()}/${this.projectName}/src/util/events`);
    fs.mkdirSync(`${process.cwd()}/${this.projectName}/src/util/handlers`);
    return `${process.cwd()}/${this.projectName}`;
  }
  async createFiles(packageJSON) {
    //! INIT
    fs.writeFileSync(
      `${process.cwd()}/${this.projectName}/package.json`,
      JSON.stringify(packageJSON, null, 4)
    );
    fs.writeFileSync(
      `${process.cwd()}/${this.projectName}/molecule.json`,
      JSON.stringify(this, null, 4)
    );
    //! SRC FILES
    /**
     * @param {files} files
     */
    fs.writeFileSync(
      `${process.cwd}/${this.projectName}/src/index.js`,
      files["index.js"]
    );
    fs.writeFileSync(
      `${process.cwd}/${this.projectName}/src/commands/ping.js`,
      files.commands["ping.js"]
    );
    fs.writeFileSync(
      `${process.cwd}/${this.projectName}/src/events/client/ready.js`,
      files.events.client["ready.js"]
    );
    fs.writeFileSync(
      `${process.cwd}/${this.projectName}/events/interaction/SlashCommands.js`,
      files.events.interaction["SlashCommands.js"]
    );
    //! UTIL
    fs.writeFileSync(
      `${process.cwd}/${this.projectName}/src/util/index.js`,
      files.util["index.js"]
    );
    fs.writeFileSync(
      `${process.cwd}/${this.projectName}/src/util/functions/database.js`,
      files.util.functions["database.js"]
    );
    fs.writeFileSync(
      `${process.cwd}/${this.projectName}/src/util/function/fileLoader.js`,
      files.util.functions["fileLoader.js"]
    );
    fs.writeFileSync(
      `${process.cwd}/${this.projectName}/src/util/handlers/commandHandler.js`,
      files.util.handlers["commandHandler.js"]
    );
    fs.writeFileSync(
      `${process.cwd}/${this.projectName}/src/util/handlers/eventHandler.js`,
      files.util.handlers["eventHandler.js"]
    );
  }
  async setup() {
    const prompt = await this.prompt();
    await this.createDirectories();
    await this.createFiles(prompt);
  }
}
