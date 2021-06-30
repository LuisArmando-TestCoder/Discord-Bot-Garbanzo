const BaseCommand = require('../../utils/structures/BaseCommand');
const scrapeIt = require('scrape-it');
const Discord =  require('discord.js');

module.exports = class QuotesCommand extends BaseCommand {
  constructor() {
    super('quotes', 'tools', []);
  }

  async run(client, message, args) {
    const search = args.join(' ').trim()
    const baseURL = 'http://quotes.toscrape.com/'

    if (!search) {
      // look for more websites later
      const {data} = await scrapeIt(baseURL, {
        tags: {
          listItem: '.tag-item a',
        }
      })
      const messageEmbed = new Discord.MessageEmbed()
      .setTitle(baseURL)
      .setDescription(JSON.stringify(data.tags, null, 2))

      message.channel.send(messageEmbed)

      return
    }

    const url = `${baseURL}tag/${search}/`
    const {data} = await scrapeIt(url, {
      quotes: {
        listItem: '.quote',
        data: {
          quote: '.text',
          author: '.author'
        }
      }
    })
    const messageEmbed = new Discord.MessageEmbed()
    .setTitle(url)
    .setDescription(
      JSON.stringify(
        data.quotes.map(({
          quote, author
        }) => quote + author),
        null,
        2
      )
    )

    message.channel.send(messageEmbed)
  }
}