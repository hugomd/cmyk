const Core = require("./core");
const Logger = require("./utils/logger");

(async () => {
  try {
    const Bot = new Core();
    await Bot.run();
  } catch (err) {
    Logger.logError(err);
  }
})();

// Fix for now.sh deployments
const { createServer } = require("http");
const server = createServer(() => {});
server.listen(3000);
