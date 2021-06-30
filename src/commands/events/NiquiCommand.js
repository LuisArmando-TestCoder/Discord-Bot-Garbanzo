const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NiquiCommand extends BaseCommand {
  constructor() {
    super('niqui', 'events', []);
  }

  run(client, message, args) {
    message.channel.send(`${
      args.join(' ')
      .replace(/[aeou]/gi, 'i')
    }`)
  }
}