const Hue = require("node-hue-api");
const { HueApi } = Hue;
const ip = '10.106.144.104';
const username = 'eDagxDnrhxOCTI77Ne1wWKTx6ebSto1u6tEgGQtr0';
const hue = new HueApi(ip, username);

/*
async function getHubIp() {

  let bridges = await Hue.nupnpSearch();

  return bridges[0].ipaddress;
}


async function registerUser(ip) {
  let result = await hue.registerUser(ip, 'NQA');

  console.log(result);
}
*/


exports.on = async function  (id) {
  return await hue.setLightState(id, { on : true });
}

exports.off = async function  (id) {
  return await hue.setLightState(id, { on : false });
}

exports.bri = async function (id, bri) {
  return await hue.setLightState(id, { bri });
}

exports.getLights = async function ()  {
  let data = await hue.lights();
  return data.lights;
}



function delay (ms) {
  return new Promise ( resolve => {
    setTimeout(resolve, ms);
  })
}



