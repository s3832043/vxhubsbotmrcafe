#!/usr/bin/nodejs

// https://github.com/zach-capalbo/hubs-client-bot

const {HubsBot} = require('hubs-client-bot')
const {ROSLIB} = require('roslib')

let bot = new HubsBot();

async function runBot() {
  let URL_TO_YOUR_HUBS_ROOM='https://hubs.mozilla.com/baRZEkr/clinical-simulation';
  await bot.enterRoom(URL_TO_YOUR_HUBS_ROOM, {name: "Automation Bot"});
  await bot.page.waitFor(5000);
  console.log("Waiting for network sync");
  // Wait for network sync. TODO: Add an actual event handler
  let STETHOSCOPE='https://sketchfab.com/3d-models/stethoscope-ce1ba77195dd4746841e58346864c059';
  let RMITCANVAS='https://www.unistude.com/wp-content/uploads/2021/02/rmit-canvas-login-page.jpg';
  let RMITLOGO='https://sso-cas.rmit.edu.au/rmitcas/images/logo.png';
  let consts = {
    RMITLOGO: RMITLOGO,
    RMITCANVAS: RMITCANVAS
  };
  await bot.spawnObject({url: RMITLOGO, position: {x:4,y:1,z:10}, pinned: true})
  await bot.spawnObject({url: STETHOSCOPE, position: {x:2,y:1,z:10}, pinned: true})
  await bot.spawnObject({url: STETHOSCOPE, position: {x:9,y:1,z:-5}, pinned: true, dynamic: true, gravity: {x:0, y: -9.8, z:0}, autoDropTimeout: 1000});
  await bot.page.waitFor(6000);
  await bot.say("Objects placed(?)");

  // https://github.com/puppeteer/puppeteer/blob/v5.5.0/docs/api.md#pageexposefunctionname-puppeteerfunction
  await bot.page.exposeFunction("getConsts", function(ctxt)
    {
        //console.log("getBot "+ctxt+" "+bot);
        //console.log("getBot "+ctxt);
        //console.log("getBot "+bot.RMITLOGO);
        return consts;
    });

  await bot.evaluate(() => {

function adjustWindow(el, idx) {
  NAF.utils.getNetworkedEntity(el).then(async networkedEl => {
    const mine = NAF.utils.isMine(networkedEl);
    var owned = NAF.utils.takeOwnership(networkedEl);
    var center = networkedEl.getAttribute('position');
    //console.log("el "+JSON.stringify(networkedEl));
    try {
      let mediaLoader = networkedEl.getAttribute('media-loader');
      console.log("el mediaLoader "+JSON.stringify(mediaLoader));
      console.log("pos "+JSON.stringify(center));
      networkedEl.setAttribute("scale","2 2 2");
      //networkedEl.setAttribute("pinned", "true");
      networkedEl.setAttribute("position", "2 1 " + (idx * 1 + 0));
      networkedEl.setAttribute("rotation", "0 0 32");
      networkedEl.setAttribute("dynamic", "true");
      networkedEl.setAttribute("gravity", "0 -9.8 0");
      networkedEl.setAttribute("autoDropTimeout", "1000");
      let url = mediaLoader['src'];
      console.log("checking url: "+url);
      let consts = await window.getConsts("closure1");
      if (url===consts.RMITLOGO) {
	console.log("url is RMITLOGO");
	let settings = {url: consts.RMITCANVAS, resolve: true, fitToBox: true};
	console.log("settings "+JSON.stringify(settings));
	networkedEl.setAttribute("media-loader", settings);
      } else {
	console.log("url is not RMITLOGO");
      }
      console.log("attributes set");
    } catch(e) {
      console.log("adjustWindow Caught "+e.name+" "+e.message); 
      console.trace(e);
    }
  });
}

    //let objs = document.querySelectorAll("[gltf-model-plus][networked]")
    let objs = document.querySelectorAll("[networked]")
    console.log("objs "+objs.length);
    for (var i=0; i<objs.length;i++) {
      let obj = objs[i];
      adjustWindow(obj,i);
    }
  });
  console.log("Done");
  await bot.say("...tidy");
  //await bot.quit();
  //process.exit(0);
}

runBot()
