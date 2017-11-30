const {
  // Postgres
  POSTGRES_DATABASE = "cmyk",
  POSTGRES_USERNAME = "",
  POSTGRES_PASSWORD = "",
  // Discord
  DISCORD_TOKEN,
  DISCORD_PREFIX = ".",
  DISCORD_PRESENCE = "help for info"
} = process.env;

module.exports = {
  // Postgres
  POSTGRES_DATABASE,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  // Discord
  DISCORD_TOKEN,
  DISCORD_PREFIX,
  DISCORD_PRESENCE,
  DISCORD_STATUS: `${DISCORD_PREFIX}${DISCORD_PRESENCE}`
};
