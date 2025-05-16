module.exports = {
  token: process.env.BOT_TOKEN,
  clientId: process.env.DISCORD_CLIENT_ID,
  guildId: process.env.DEV_GUILD_ID,
  useGuildCommands: true,
  colors: {
    success: "000080",
  },
  channels: {
    log: process.env.CHANNEL_ID,
  },
};
