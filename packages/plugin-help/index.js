const Config = require('@hugomd/cmyk-config');
const BasePlugin = require('@hugomd/cmyk-plugin-base');

class Help extends BasePlugin {
	constructor() {
		super();
		this.conf = {
			name: 'help',
			help: `\`${Config.DISCORD_PREFIX}help\` returns help information`,
			regex: new RegExp(`^${Config.DISCORD_PREFIX}help`)
		};
	}

	async handler(msg) {
		super.handler(msg);
		if (this.args[0]) {
			if (Object.keys(this.client.pluginHelp).includes(this.args[0])) {
				msg.author.send(this.client.pluginHelp[this.args[0]]);
			} else {
				msg.author.send(`No such module ${this.args[0]}`);
				this.status = '🚫';
			}
			// Look up individual helptext
			return;
		}
		// Otherwise, return with global help
		msg.author.send(this.client.helpText);
	}

	config() {
		return this.conf;
	}
}

module.exports = Help;
