const Core = require('@hugomd/cmyk-core');
const Logger = require('@hugomd/cmyk-logger');
// Import core and start it here

(async () => {
	try {
		const Bot = new Core();
		await Bot.run();
	} catch (err) {
		Logger.logError(err);
		throw err;
	}
})();
