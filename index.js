// discord
const Discord = require("discord.js");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
  ],
});
// お手製
const app_root = require("app-root-path");
const config = require(app_root + "/config.js");
// bot起動時の処理
client.on("ready", () => {
  console.log("ready!");
  client.user.setPresence({
    activities: [{ name: `Blue Archive` }],
    status: "online",
  });
  client.channels.cache.get(config.channels.log).send("起動");

  // スラッシュコマンドの読込
  load_commands.start(client);
});
// bot起動処理
(async () => {
  try {
    // Discordログイン
    client.login(config.token);
  } catch (error) {
    console.log(error);
  }
})();
