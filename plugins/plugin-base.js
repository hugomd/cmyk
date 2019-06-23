const config = require('../config');
const logger = require('../utils/logger');

class Base {
	constructor() {
		this.conf = {
			regex: {
				test: () => false
			},
			react: false
		};
		this.status = '✅';
	}

	register(client) {
		this.client = client;
		client.on('pluginmessage', async msg => {
			try {
				if (this.conf.regex.test(msg)) {
					await this.checkPermissions(msg);
					await this.preHandler(msg);
					await this.handler(msg).catch(() => {
						// TODO: Handler errors here!!
						this.status = '❌';
					});
					await this.postHandler(msg);
				}
			} catch (err) {
				logger.logError(err);
			}
		});
	}

	// TODO
	async checkPermissions() {}

	// TODO
	async preHandler() {}

	async handler(msg) {
		this.args = msg.content
			.replace(`${config.DISCORD_PREFIX}${this.conf.name}`, '')
			.trim()
			.split(' ');
	}

	async postHandler(msg) {
		if (this.conf.react) {
			msg.react(this.status);
		}
	}

	config() {
		return this.conf;
	}

	escapeRegex(string) {
		// https://stackoverflow.com/a/6969486
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
	}
}

module.exports = Base;
