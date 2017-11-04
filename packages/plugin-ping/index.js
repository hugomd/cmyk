const Config = require('@hugomd/cmyk-config');
const BasePlugin = require('@hugomd/cmyk-plugin-base');

class Ping extends BasePlugin {
	constructor() {
		super();
		this.conf = {
			name: 'ping',
			help: `\`${Config.DISCORD_PREFIX}ping\` responds with pong`,
			regex: new RegExp(`^${Config.DISCORD_PREFIX}ping`)
		};
	}
	async handler(msg) {
		super.handler(msg);
		msg
			.reply('Pinging...')
			.then(sentMsg =>
				sentMsg.edit(
					`Pong! Took ${sentMsg.createdTimestamp - msg.createdTimestamp} ms.`
				)
			);
		return;
	}

	help() {
		return 'Help text';
	}

	config() {
		return this.conf;
	}
}

module.exports = Ping;
