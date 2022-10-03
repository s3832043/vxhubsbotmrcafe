#!/usr/bin/nodejs

// https://github.com/zach-capalbo/hubs-client-bot

//const {HubsBot} = require('hubs-client-bot')
const {HubsBot} = import('hubs-client-bot')

function adjustAllPlanks() {
  var startOffset = -7.5;
  var planks = document.querySelectorAll("[gltf-model-plus][networked]")
  var offset = 2.6;
  var totalPlanks = 8;
  console.log("planks "+planks.length);
  for (var i=0;i<totalPlanks;i++) {
    adjustWindow(planks[i],i);
  }
  console.log("adjustAllPlanks done");
}

function adjustWindow(el, idx) {
  NAF.utils.getNetworkedEntity(el).then(networkedEl => {
    const mine = NAF.utils.isMine(networkedEl);
    var owned = NAF.utils.takeOwnership(networkedEl);
    networkedEl.setAttribute("scale","23 1 5");
    networkedEl.setAttribute("position", "-0.1 3" + (idx * offset + startOffset));
    networkedEl.setAttribute("rotation","0 0 32");
    //await bot.say("adjustWindow "+e1+" "+idx);
    console.log("adjustWindow "+e1+" "+idx);
  });
}
//    adjustAllPlanks();
//    console.log("finished");
//  })
//}

let bot = new HubsBot();

async function runBot() {
  let URL_TO_YOUR_HUBS_ROOM='https://hubs.mozilla.com/baRZEkr/clinical-simulation';
  await bot.enterRoom(URL_TO_YOUR_HUBS_ROOM, {name: "Automation Bot"});
  // Wait for network sync. TODO: Add an actual event handler
  await bot.page.waitFor(5000);
  //let STETHOSCOPE='https://sketchfab.com/3d-models/stethoscope-ce1ba77195dd4746841e58346864c059';
  //await bot.spawnObject({url: STETHOSCOPE, position: {x:2,y:1,z:10}})
  //await bot.spawnObject({url: STETHOSCOPE, position: {x:9,y:1,z:-5}, pinned: false});
  await bot.say("Placed stethoscope");
  await bot.page.evaluate(() => {
    console.log("hello");
  });
}

runBot()
