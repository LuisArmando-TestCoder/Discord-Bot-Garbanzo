const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LoraCommand extends BaseCommand {
  constructor() {
    super('lorona', 'events', []);
  }

  run(client, message, args) {
    const loraMessage = args.join(' ')

    message.channel.send(`${
      loraMessage
      .replace('soy', 'eres')
      .replace('hermos', 'fe')
      .replace('que guapa eres', 'la verdad')
    } urria`)
  }
}