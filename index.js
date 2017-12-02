const {createServer} = require('http');

const Core = require('./core');
const logger = require('./utils/logger');

(async () => {
	try {
		const Bot = new Core();
		await Bot.run();
	} catch (err) {
		logger.logError(err);
	}
})();

// Fix for now.sh deployments
const server = createServer(() => {});
server.listen(3000);
