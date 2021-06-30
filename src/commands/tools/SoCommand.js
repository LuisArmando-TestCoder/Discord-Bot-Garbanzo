// https://stackoverflow.com/oauth

const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord =  require('discord.js');
const stackexchange = require('stackexchange');

function getURLLikeASCIIHexadecimals(text) {
  const specialCharacters = '$&+,/:;=?@ \'"<>#%{}|\\^~[]';
  const hexadecimalBase = 16;
  const URLText = text.split('').map((letter) => {
    const havingSpecialCharacter = specialCharacters.includes(letter);
 
    if (havingSpecialCharacter) {
      const specialCharacter = `%${(+letter.charCodeAt()).toString(hexadecimalBase)}`;
 
      return specialCharacter;
    }
 
    return letter;
  }).join('');
 
  return URLText;
};

module.exports = class QuotesCommand extends BaseCommand {
  constructor() {
    super('so', 'tools', []);
  }

  async run(client, message, args) {
    const search = getURLLikeASCIIHexadecimals(args.join(' ').trim())
    const messageEmbed = new Discord.MessageEmbed()
      .setTitle(search)

    message.channel.send(messageEmbed)

    const options = { version: 2.2 };
    const context = new stackexchange(options);
    const filter = {
      key: 'YOUR_API_KEY',
      pagesize: 50,
      tagged: 'node.js',
      sort: 'activity',
      order: 'asc'
    };

    try {
      // Get all the questions (http://api.stackexchange.com/docs/questions)
      context.questions.questions(filter, function(err, results){
        if (err) throw err;
        
        console.log(results.items);
        console.log(results.has_more);
      });

      // Get results for a different website within the stackexchange network
      filter.site = 'softwareengineering';
      context.questions.questions(filter, function(err, results){
        if (err) throw err;
        
        console.log(results.items);
        console.log(results.has_more);
      });

      // Get all users
      context.users.users(filter, function(err, results){
        if (err) throw err;

        console.log(results.items);
        console.log(results.has_more);
      });
    } catch (e) {
      console.error(e)
    }
  }
}