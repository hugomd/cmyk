const Core = require('./core');
const logger = require('./utils/logger');

(async () => {
	try {
		const Bot = new Core();
		await Bot.run();
	} catch (error) {
		logger.logError(error);
	}
})();
