const Discord = require("discord.js");
/**
 * インタラクション受信時の処理
 */
exports.call = async function (client) {
  client.on("interactionCreate", async (interaction) => {
    // コマンド実行時
    try {
      if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        // 指定されたコマンドが見つからなければ中断
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        // コマンドを実行する
        const role = interaction.guild.roles.cache.find(
          (roles) => roles.name === "GameMaster",
        );
        if (!interaction.member.roles.cache.has(role.id)) {
          return interaction.reply("権限がありません。");
        } else {
          await command.execute(interaction, client);
        }
      }
    } catch (error) {
      client.channels.cache.get(config.channels.log).send(error);
    }
  });
};
