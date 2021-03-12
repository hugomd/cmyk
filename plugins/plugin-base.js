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
			// Reset status
			this.status = '✅';
			try {
				if (this.conf.regex.test(msg)) {
					// TODO: Instantiate a new version of the class here, to reset any variables from previous invocations
					await this.checkPermissions(msg);
					await this.preHandler(msg);
					await this.handler(msg).catch(() => {
						// TODO: Handler errors here!!
						this.status = '❌';
					});
					await this.postHandler(msg);
				}
			} catch (error) {
				logger.logError(error);
			}
		});
		client.on('interactionmessage', async interaction => {
			try {
				if (interaction.data.name === this.conf.name) {
					await this.interactionHandler(interaction);
				}
			} catch (error) {
				logger.logError(error);
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

	async interactionHandler(interaction) {}

	config() {
		return this.conf;
	}
}

module.exports = Base;
