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
const app_root = require("app-root-path");
const config = require(app_root + "/config.js");
const load_commands = require(app_root + "/startup/load_commands.js");
/**
 * スラッシュコマンド登録処理
 */
const deploy_commands = require(app_root + "/startup/deploy_commands.js");
deploy_commands.start();
/**
 * インタラクション（コマンド）受信時の処理
 */
const interaction_create_handler = require(
  app_root + "/startup/interaction_create_handler.js",
);
interaction_create_handler.call(client);
// bot起動時の処理
client.on("ready", () => {
  client.channels.cache.get(config.channels.log).send("started");
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
