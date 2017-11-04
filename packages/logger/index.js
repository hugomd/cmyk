const {log} = console;
const {blue, red, green} = require('chalk');

/**
 * Handles all logging in CMYK bot
 *
 */
class Logger {

  /**
   * Logs a Discord.js Message
   * @param {Message} Discord.js Message
   */
  static logMsg({author: {username}, channel: {name}, content}) {
    const logStr = `${blue(username)} => ${blue(name)}: ${content}`;
    log(logStr);
  }

  /**
   * Logs an error message
   * @param {String} Message to log
   */
  static logError(msg) {
    log(red(msg));
  }

  /**
   * Logs a success message
   * @param {String} Message to log
   */
  static logSuccess(msg) {
    log(green(msg));
  }
}

module.exports = Logger;
