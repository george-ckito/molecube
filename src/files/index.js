import PINGCMD from "./src/commands/ping.js";
import ready from "./src/events/client/ready.js";
import SlashCommands from "./src/events/interaction/SlashCommands.js";
import database from "./src/util/functions/database.js";
import fileLoader from "./src/util/functions/fileLoader.js";
import commandHandler from "./src/util/handlers/commandHandler.js";
import eventHandler from "./src/util/handlers/eventHandler.js";
import indexutil from "./src/util/index.js";
import index from "./src/index.js";

export default {
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
