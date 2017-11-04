const Config = require('@hugomd/cmyk-config');
const Logger = require('@hugomd/cmyk-logger');

class Base {
	constructor() {
		this.conf = {
			regex: {
				test: () => false
			}
		};
		this.status = '✅';
	}

	register(client) {
		this.client = client;
		client.on('pluginmessage', async msg => {
			try {
				if (this.conf.regex.test(msg)) {
					await this.handler(msg);
					await this.postHandler(msg);
				}
			} catch (err) {
				Logger.logError(err);
			}
		});
	}

	async handler(msg) {
		// TODO: Handle permissions here
		this.args = msg.content.replace(`${Config.DISCORD_PREFIX}${this.conf.name}`, '').trim().split(' ');
	}

	async postHandler(msg) {
		msg.react(this.status);
	}
}

module.exports = Base;
