const axios = require('axios');

const config = require('../../config');
const BasePlugin = require('../plugin-base.js');
const COINS = require('./coins');

class Crypto extends BasePlugin {
	constructor() {
		super();
		this.conf = {
			name: 'crypto',
			help: `\`${
				config.DISCORD_PREFIX
			}crypto [ETH|Ethereum|BTC|Bitcoin] \` responds with current price of 1 coin`,
			regex: new RegExp(`^${config.DISCORD_PREFIX}crypto`),
			react: true
		};
	}

	async handler(msg) {
		this.status = '✅';
		super.handler(msg);
		const coin = this.args[0];
		if (!coin || !COINS.includes(coin)) {
			msg.author.send(
				'You need to supply a currency from this list: https://cl.ly/1C063T3D032S/+',
			);
			throw new Error('Invalid currency');
		}

		const response = await msg.reply('Fetching data...');
		const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${
			coin
		}&tsyms=USD`;
		const {data} = await axios(url);
		if (data.Response === 'Error') {
			throw new Error('Request failed');
		}
		const {[coin]: {USD: price = null} = null} = data;
		if (!price) {
			throw new Error('Failed to fetch price of BTC.');
		}
		response.edit(`1 ${coin} = **${price} USD**`);
	}

	async postHandler(msg) {
		super.postHandler(msg);
	}
}

module.exports = Crypto;
