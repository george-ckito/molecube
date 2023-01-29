import PINGCMD from "./src/commands/ping";
import ready from "./src/events/client/ready";
import SlashCommands from "./src/events/interaction/SlashCommands";
import database from "./src/util/functions/database";
import fileLoader from "./src/util/functions/fileLoader";
import commandHandler from "./src/util/handlers/commandHandler";
import eventHandler from "./src/util/handlers/eventHandler";
import indexutil from "./src/util/index";
import index from "./src/index";

module.exports = {
  commands: {
    "ping.js": PINGCMD,
  },
  events: {
    client: {
      "ready.js": ready,
    },
    interaction: {
      "SlashCommands.js": SlashCommands,
    },
  },
  util: {
    functions: {
      "database.js": database,
      "fileLoader.js": fileLoader,
    },
    handlers: {
      "commandHandler.js": commandHandler,
      "eventHandler.js": eventHandler,
    },
    "index.js": indexutil,
    "warning.txt": "It's not recommended to change code in util folder",
  },
  "index.js": index,
};
