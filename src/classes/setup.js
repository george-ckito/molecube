import { bot } from "./botInfo.js";
import { spawn } from "child_process";
import { createSpinner } from "nanospinner";
import fs from "fs";
import files from "../files/index.js";
import inquirer from "inquirer";
import chalk from "chalk";

export class setup {
  /**
   *
   * @param {bot} botInfo,
   */
  constructor(botInfo) {
    this.botInfo = botInfo;
  }
  async createDirectories() {
    fs.mkdirSync(`${process.cwd()}/${this.botInfo.projectName}`);
    fs.mkdirSync(`${process.cwd()}/${this.botInfo.projectName}/src`);
    fs.mkdirSync(`${process.cwd()}/${this.botInfo.projectName}/src/commands`);
    fs.mkdirSync(`${process.cwd()}/${this.botInfo.projectName}/src/events`);
    fs.mkdirSync(
      `${process.cwd()}/${this.botInfo.projectName}/src/events/interaction`
    );
    fs.mkdirSync(
      `${process.cwd()}/${this.botInfo.projectName}/src/events/client`
    );
    fs.mkdirSync(`${process.cwd()}/${this.botInfo.projectName}/src/util`);
    fs.mkdirSync(
      `${process.cwd()}/${this.botInfo.projectName}/src/util/events`
    );
    fs.mkdirSync(
      `${process.cwd()}/${this.botInfo.projectName}/src/util/handlers`
    );
    fs.mkdirSync(
      `${process.cwd()}/${this.botInfo.projectName}/src/util/functions`
    );
    return `${process.cwd()}/${this.botInfo.projectName}`;
  }
  async createFiles(packageJSON) {
    //! INIT
    fs.writeFileSync(
      `${process.cwd()}/${this.botInfo.projectName}/package.json`,
      JSON.stringify(packageJSON, null, 4)
    );
    fs.writeFileSync(
      `${process.cwd()}/${this.botInfo.projectName}/molecule.json`,
      JSON.stringify(this, null, 4)
    );
    //! SRC FILES
    /**
     * @param {files} files
     */
    fs.writeFileSync(
      `${process.cwd()}/${this.botInfo.projectName}/src/index.js`,
      files["index.js"]
    );
    fs.writeFileSync(
      `${process.cwd()}/${this.botInfo.projectName}/src/commands/ping.js`,
      files.commands["ping.js"]
    );
    // fs.writeFileSync(
    //   `${process.cwd()}/${this.botInfo.projectName}/src/events/client/ready.js`,
    //   files.events.client["ready.js"]
    // );
    // fs.writeFileSync(
    //   `${process.cwd()}/${
    //     this.botInfo.projectName
    //   }/events/interaction/SlashCommands.js`,
    //   files.events.interaction["SlashCommands.js"]
    // );
    //! UTIL
    fs.writeFileSync(
      `${process.cwd()}/${this.botInfo.projectName}/src/util/index.js`,
      files.util["index.js"]
    );
    fs.writeFileSync(
      `${process.cwd()}/${
        this.botInfo.projectName
      }/src/util/functions/database.js`,
      files.util.functions["database.js"]
    );
    fs.writeFileSync(
      `${process.cwd()}/${
        this.botInfo.projectName
      }/src/util/functions/fileLoader.js`,
      files.util.functions["fileLoader.js"]
    );
    fs.writeFileSync(
      `${process.cwd()}/${
        this.botInfo.projectName
      }/src/util/handlers/commandHandler.js`,
      files.util.handlers["commandHandler.js"]
    );
    fs.writeFileSync(
      `${process.cwd()}/${
        this.botInfo.projectName
      }/src/util/handlers/eventHandler.js`,
      files.util.handlers["eventHandler.js"]
    );
  }

  async setup() {
    const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
    const prompt = await this.botInfo.prompt();
    if (fs.existsSync(`${process.cwd()}/${this.botInfo.projectName}`)) {
      const exists = await inquirer.prompt({
        name: "existsFolder",
        type: "confirm",
        message: "Folder already exists, delete the folder?",
      });
      if (exists.existsFolder) {
        let spinner = createSpinner("Deleting folder...").start();
        await sleep(3000);
        fs.rmSync(`${process.cwd()}/${this.botInfo.projectName}`, {
          recursive: true,
          force: true,
        });

        spinner.success({ text: "Deleted the folder!" });
      } else {
        return console.log(chalk.red("Exitted because folder wasn't deleted"));
      }
    }
    await this.createDirectories();
    await this.createFiles(prompt);
    switch (this.botInfo.packageManager) {
      case "Yarn": {
        const install = spawn(
          `${process.env.USERPROFILE}/AppData/Roaming/npm/yarn.cmd`,
          ["add", "mongodb", "mongoose", "ascii-table", "discord.js", "glob"],
          {
            cwd: `${process.cwd()}/${this.botInfo.projectName}`,
          }
        );
        let spinner = createSpinner("Installing Packages...").start();
        install.on("close", (code) => {
          if (code == 0) {
            spinner.success({ text: "Installed packages!" });
          }
        });
        install.on("error", (error) => {
          console.log(error);
          spinner.error({ text: "Something went wrong!" });
        });
        break;
      }
      case "Npm": {
        const install = spawn(
          `${process.env.USERPROFILE}/AppData/Roaming/npm/npm.cmd`,
          [
            "install",
            "mongodb",
            "mongoose",
            "ascii-table",
            "discord.js",
            "glob",
          ],
          {
            cwd: `${process.cwd()}/${this.botInfo.projectName}`,
          }
        );
        let spinner = createSpinner("Installing Packages...").start();
        install.on("close", (code) => {
          if (code == 0) {
            spinner.success({ text: "Installed packages!" });
          }
        });
        install.on("error", (error) => {
          console.log(error);
          spinner.error({ text: "Something went wrong!" });
        });
        break;
      }
    }
  }
}
