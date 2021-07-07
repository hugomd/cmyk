const config = require('../../config');
const BasePlugin = require('../plugin-base.js');

class Ping extends BasePlugin {
	constructor() {
		super();
		this.conf = {
			name: 'ping',
			help: `\`${config.DISCORD_PREFIX}ping\` responds with pong`,
			regex: new RegExp(`^${this.escapeRegex(config.DISCORD_PREFIX)}ping`)
		};
	}

	async handler(msg) {
		super.handler(msg);
		msg
			.reply('Pinging...')
			.then(sentMsg => {
				const fromDate = sentMsg.createdTimestamp;
				const toDate = msg.editedTimestamp || msg.createdTimestamp;
				sentMsg.edit(
					`Pong! Took ${fromDate - toDate} ms.`
				);
			});
	}

	async interactionHandler(interaction) {
		this.client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: 'Pong!',
					flags: 64
				}
			}
		})
	}
}

module.exports = Ping;
