import fs from 'fs'

import startBrowser from './src/browser.js'
import { setName } from './src/utils.js'
import ROSLIB from 'roslib'

// Demos
import proximityDoors from './demos/proximityDoors.js'
import imageSequence from './demos/imageSequence.js'
import rosie from './demos/rosie.js'
import loadFireExt from './demos/fireExt.js'
import slideDeck from './demos/slideDeck.js'

import { ANSIColor, textWithColor, routeLogsToContainer } from './puppet_logging.js'

const config = JSON.parse(fs.readFileSync('./config.json'))

const selectDemo = async () => {

  // Login and set the bot name
  console.log("=============================")
  const page = await startBrowser(config.roomURL)
  await page.evaluate(setName, config.botName ?? 'VXBot')

  console.log(textWithColor('setup done.\n', ANSIColor.Green));

  // forward puppeteer logs to here
  routeLogsToContainer(page)

  // Choose demo from command line arguments
  // the run_demos.sh script should take care of this
  let demo_choice = process.argv[2];
  switch(demo_choice) {
    case "1":
      await proximityDoors(page)
      break;
    case "2":
      await rosie(page)
      break;
    case "3":
      await imageSequence(page)
      break;
    case "4":
      await slideDeck(page)
      break;
    case "5":
      await loadFireExt(page)
      break;
    default:
      console.log("Invalid demo choice.")
      console.log("ie. run_demos gave demo_picker.js bad args.")
  }
}

selectDemo();
