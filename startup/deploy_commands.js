console.log("deploy_commands.js が読み込まれました");
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
  console.log("deploy_commands.start() が呼び出されました。");
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

  // 登録処理
  (async () => {
    console.log("登録処理が呼び出されました。");
    try {
      console.log(`${commands.length}個のコマンドの登録を開始します。`);

      let data;
      if (config.useGuildCommands) {
        // ギルドコマンドとして登録（即時反映）
        data = await rest.put(
          Routes.applicationGuildCommands(config.clientId, config.guildId),
          { body: commands },
        );
        console.log(
          `ギルドコマンドとして ${data.length} 個のコマンドを登録しました。`,
        );
      } else {
        // グローバルコマンドとして登録（反映に最大1時間）
        data = await rest.put(Routes.applicationCommands(config.clientId), {
          body: commands,
        });
        console.log(
          `グローバルコマンドとして ${data.length} 個のコマンドを登録しました。`,
        );
      }
    } catch (error) {
      console.error(error);
    }
  })();
};
