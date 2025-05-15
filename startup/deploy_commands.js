// お手製
const app_root = require("app-root-path");
const config = require(app_root + "/config.js");
// discord
const { REST, Routes } = require("discord.js");
const rest = new REST({ version: "10" }).setToken(config.token);
// node file system
const fs = require("node:fs");
// コマンド読み込み用
const commands = [];
const commandFolders = fs.readdirSync("./commands");

/**
 * スラッシュコマンド登録処理
 */
exports.start = async function () {
  // commandsフォルダの中のサブフォルダを読み込む
  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
    // サブフォルダの中から1ファイルずつ処理する
    for (const file of commandFiles) {
      const command = require(`../commands/${folder}/${file}`);
      commands.push(command.data.toJSON());
    }
  }
  // コマンド登録処理
  (async () => {
    try {
      console.log(`${commands.length}個のコマンドの登録を開始します。`);
      // 全サーバで使えるコマンド登録
      const data = await rest.put(Routes.applicationCommands(config.clientId), {
        body: commands,
      });
      console.log(`${data.length} 個のコマンドを登録しました。`);
    } catch (error) {
      console.error(error);
    }
  })();
};
