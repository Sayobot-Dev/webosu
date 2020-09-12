const body = require('koa-body');
const Koa = require('koa');

const hostname = '127.0.0.1';
const port = 3001;
var a = [];

const app = new Koa();
app.use(body());
app.use((ctx) => {
  var ip = ctx.request.headers["x-real-ip"] || ctx.request.headers['x-forwarded-for'] || ctx.request.ip;
  const q = {}
  if (ip) {
    ip = ip.split(".");
    ip[0] = "**";
    if (ip.length > 3) ip[3] = "**";
    ip = ip.join(".");
  } else ip = "";
  q.ip = ip;
  if (q.title || q.sid) a.push(q);
  if (a.length > 16) a.shift();
  ctx.body = JSON.stringify(a);
})

app.listen(port, hostname);
