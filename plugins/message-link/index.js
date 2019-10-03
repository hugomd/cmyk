const config = require('../../config');
const BasePlugin = require('../plugin-base.js');
const logger = require('../../utils/logger');

class MessageLink extends BasePlugin {
	constructor() {
		super();
		this.conf = {
			name: 'link',
			help: 'Retrieves a link to a message on Discord by message ID',
			regex: new RegExp(`^${config.DISCORD_PREFIX}link`)
		};
	}

	async handler(msg) {
		super.handler(msg);

		if (!msg.guild) {
			return msg.author.send('Retrieving a message link only works in guilds.');
		}

		if (!this.args[0]) {
			return msg.author.send('You must supply a message ID.');
		}

		try {
			const message = await msg.channel.fetchMessage(this.args[0]);
			if (!message) {
				return msg.author.send('No message found with that message ID.');
			}

			const {channel: {id: channelId}, guild: {id: guildId}, id} = message;

			msg.author.send(`Here's your direct message link: https://discordapp.com/channels/${guildId}/${channelId}/${id})`);
		} catch (error) {
			logger.logError(error);
		}
	}
}

module.exports = MessageLink;
