import fs from 'fs'

import startBrowser from './src/browser.js'
import { setName } from './src/utils.js'
import ROSLIB from 'roslib'

// Demos
import proximityDoors from './demos/proximityDoors.js'
import imageSequence from './demos/imageSequence.js'
import rosie from './demos/rosie.js'

import { ANSIColor, textWithColor, routeLogsToContainer } from './puppet_logging.js'

const config = JSON.parse(fs.readFileSync('./config.json'))

// Login and set the bot name
const login = async () => {
  let text = "Index.js has no functionality.\n"
  text += "Use the demo runner script ./run_demos.\n"

  console.log(textWithColor(text, ANSIColor.Green));
}



login()
