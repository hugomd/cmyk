const Discord = require('discord.js');
const Logger = require('@hugomd/cmyk-logger');
const Config = require('@hugomd/cmyk-config');

// Plugins
const Ping = require('@hugomd/cmyk-plugin-ping');
const Help = require('@hugomd/cmyk-plugin-help');

class Core {
	async run() {
		this.client = new Discord.Client();
		await this.connect();
	}

	async load() {
		Logger.logInfo('Loading plugins and setting up...');
		await this.setPresence();
		// Setup Discord
		// - Set presence
		// Setup Database
		// Register modules
		// Register events
		//
		this.plugins = [new Ping(), new Help()];
		this.registerPlugins();
		this.setupMessageHandler();
		this.compileHelp();
		Logger.logInfo('Done!');
	}

	async setPresence() {
		return this.client.user.setPresence({
			status: 'online',
			afk: false,
			game: {
				name: Config.DISCORD_STATUS,
				url: 'https://g.hu.md/hugo/aqua'
			}
		});
	}

	registerPlugins() {
		this.plugins.map(plugin => plugin.register(this.client));
	}

	compileHelp() {
		let helpText = '';
		let pluginHelp = {};
		this.plugins.map(plugin => {
			const pluginConfig = plugin.config();
			helpText += `
**${pluginConfig.name}**
${pluginConfig.help}
`;
			pluginHelp[pluginConfig.name] = pluginConfig.help;
		});
		this.client.helpText = helpText;
		this.client.pluginHelp = pluginHelp;
	}

	async connect() {
		// Connect to Postgres
		// Connect to Discord
		return this.client.login(Config.DISCORD_TOKEN).then(async () => {
			Logger.logSuccess('> Connected');
			await this.load();
		});
	}

	setupMessageHandler() {
		this.client.on('message', msg => {
			if (
				!msg.content.match(new RegExp('^\\' + Config.DISCORD_PREFIX + '\\w+'))
			) {
				return;
			}
			if (msg.author.bot) {
				return;
			}
			Logger.logMsg(msg);
			this.client.emit('pluginmessage', msg);
		});
	}
}

module.exports = Core;
