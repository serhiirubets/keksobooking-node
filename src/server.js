const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const path = require(`path`);
const {promisify} = require(`util`);
const config = require(`./config`);

const hostname = `127.0.0.1`;
const port = process.argv[3] || config.server.port;

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);

const printDirectory = (absolutePath, files, host) => {
  const staticPosition = absolutePath.indexOf(`/static/`);
  const lengthOfStaticWord = 8;
  const elementUrl = absolutePath.slice(staticPosition + lengthOfStaticWord);
  console.log(host);
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Directory content</title>
      </head>
      
      <body>
        <ul>
          ${files.map((element) => `<li><a href="http://${host}/${elementUrl + `/` + element}">${element}</a></li>`).join(``)}
        </ul>
      </body>
    </html>
  `;
};

const readFile = async (absolutePath, res) => {
  const data = await readfile(absolutePath);
  const ext = path.extname(absolutePath).slice(1);
  const contentType = config.contentType[ext] ? config.contentType[ext] : `text/plain`;

  res.setHeader(`content-type`, contentType);
  res.setHeader(`content-length`, Buffer.byteLength(data));
  res.end(data);
};

const readDir = async (absolutePath, res, host) => {
  const files = await readdir(absolutePath);
  const content = printDirectory(absolutePath, files, host);
  res.setHeader(`content-type`, `text/html`);
  res.end(content);
};

const server = http.createServer((req, res) => {
  const {pathname} = url.parse(req.url);
  const absolutePath = path.join(__dirname, `..`, `static`, pathname);

  (async () => {
    try {
      const pathStat = await stat(absolutePath);

      res.statusCode = 200;
      res.statusMessage = `OK`;

      if (pathStat.isDirectory()) {
        await readDir(absolutePath, res, req.headers.host);
      } else {
        await readFile(absolutePath, res);
      }
    } catch (e) {
      res.writeHead(404, `Not Found`);
      res.end();
    }
  })()
      .catch((e) => {
        res.writeHead(500, e.message, {
          'content-type': `text/plain`
        });
        res.end(e.message);
      });
});

module.exports = {
  name: `server`,
  description: `Start local server`,
  execute() {
    server.listen(port, hostname, (err) => {
      if (err) {
        return console.error(err);
      }
      return console.log(`Server was started on http://${hostname}:${port}`);
    });
  }
};
