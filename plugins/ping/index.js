const Config = require('../../config');
const BasePlugin = require('../plugin-base.js');

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

  config() {
    return this.conf;
  }
}

module.exports = Ping;
