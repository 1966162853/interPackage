import { Controller, Get } from '@midwayjs/decorator';

@Controller('/')
export class HomeController {
  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
}

const cheerio = require('cheerio');
const http = require('http');
const https = require('https');
const url = 'https://www.baidu.com/';

const filterData = data => {
  const $ = cheerio.load(data);
  $('#lg')
    .children('img')
    .each((index, el) => {
      console.log($(el).attr('src'));
    });
};

const server = http.createServer(() => {
  let data = '';
  https.get(url, result => {
    result.on('data', chunk => {
      data += chunk;
    });
    result.on('end', () => {
      filterData(data);
    });
  });
});

server.listen(5080, () => {
  console.log('localhost:5080 Listen...');
});
