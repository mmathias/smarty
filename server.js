const huelib = require('./hue.lib');
const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());



router.get('/lights',  async function () {

  this.body = await huelib.getLights();

});

router.get('/lights/:id', async function () {

  let lights = await huelib.getLights();

  let state = lights.filter(l => l.id == this.params.id)[0] || {};

  this.body = state;

});

router.post('/lights/:id', async function ()  {

  let { state, brightness } = this.request.body;

  console.log(state, brightness);

  if (state !== 'off') {
    await huelib.on(this.params.id);
    if (brightness) {
      await huelib.bri(this.params.id, this.request.body.brightness);
    }
  } else if (state == 'off') {
    await huelib.off(this.params.id);

  }

  this.body = 'ok';

});

app.use(router.routes());
app.listen(8001);
