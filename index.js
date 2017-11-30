const Core = require('./core');
const Logger = require('./utils/logger');

(async () => {
	try {
		const Bot = new Core();
		await Bot.run();
	} catch (err) {
		Logger.logError(err);
	}
})();
