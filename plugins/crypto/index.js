const axios = require('axios');

const {logError} = require('../../utils/logger');
const config = require('../../config');
const BasePlugin = require('../plugin-base.js');

class Crypto extends BasePlugin {
	constructor() {
		super();
		this.conf = {
			name: 'crypto',
			help: `\`${config.DISCORD_PREFIX}crypto [ETH|Ethereum|BTC|Bitcoin] \` responds with current price of 1 coin`,
			regex: new RegExp(`^${config.DISCORD_PREFIX}crypto`)
		};
	}

	async handler(msg) {
		super.handler(msg);
		const crypto = this.args[0].toLowerCase();
		if (!crypto) {
			msg.reply('You need to supply one of `[ETH|Ethereum|BTC|Bitcoin]');
		}

		const reply = await msg.reply('Fetching data...');

		switch (crypto) {
			case 'btc':
			case 'bitcoin':
				try {
					const {data: {BTC: {USD: price = null}}} = await axios('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD');
					if (!price) throw new Error("Failed to fetch price of BTC.");
					reply.edit(`1 BTC = **${price} USD**`);
				} catch (err) {
					logError(err);
					this.status = '🚫';
				}
				break;
			case 'eth':
			case 'ethereum':
				try {
					const {data: {ETH: {USD: price = null}}} = await axios('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD');
					if (!price) throw new Error("Failed to fetch price of ETH.");
					reply.edit(`1 ETH = **${price} USD**`);
				} catch (err) {
					logError(err);
					this.status = '🚫';
				}
				break;
			default:
				this.status = '🚫';
				break;
		}
	}
}

module.exports = Crypto;
