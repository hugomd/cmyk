const Discord = require('discord.js');
const RequireAll = require('require-all');

const Logger = require('./utils/logger');
const Config = require('./config');

const Plugins = RequireAll({
	dirname: __dirname + '/plugins',
	filter: /(index)\.js$/,
	excludeDirs: /^\.(git|svn)$/,
	recursive: true,
	resolve: plugin => {
		return new plugin();
	}
});

class Core {

	constructor() {
		this.validateConfig(Config);
	}
	async run() {
		this.client = new Discord.Client();
		await this.connect();
	}

	async load() {
		Logger.logInfo('Loading plugins and setting up...');
		await this.setPresence();
		// TODO: Setup Database
		// TODO: Register events
		this.plugins = Object.keys(Plugins).map(key => Plugins[key].index);
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
		Logger.logInfo('> Registering plugins..');
		this.plugins.map(plugin => plugin.register(this.client));
	}

	compileHelp() {
		Logger.logInfo('> Compiling help..');
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
		// TODO: Connect to Postgres
		// Connect to Discord
		return this.client.login(Config.DISCORD_TOKEN).then(async () => {
			Logger.logSuccess('> Connected');
			Logger.logInfo('> Loading bot..');
			await this.load();
		});
	}

	setupMessageHandler() {
		Logger.logInfo('Setting up message handler..');
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

	validateConfig(config) {
		Logger.logInfo('> Validating config..');
		const undefConf = [];
		Object.keys(config).map(key => {
			if (config[key] === undefined) {
				undefConf.push(key);
			}
		});
		if (undefConf.length > 0) {
			undefConf.map(key => Logger.logError(`> ${key} environment variable undefined.`));
			throw new Error('All Config variables must be defined');
		}
	}
}

module.exports = Core;
