// Util funcitons for logging puppeteer output

// ANSI escape codes for changing colors in terminal
export const ANSIColor = {
  Grey:   '\u001b[30m',
	Red:    '\u001b[31m',
	Green:  '\u001b[32m',
	Blue:   '\u001b[34m',
	Yellow: '\u001b[33m',
  Purple: '\u001b[35m',
  Cyan:   '\u001b[36m'
}

// wrap msg with color escape codes
export function textWithColor(msg, color){
  return color + msg + '\u001b[39m'
}

// Promises return jsHandle objects, this prints them correctly
function describe(jsHandle) {
  return jsHandle.executionContext().evaluate(obj => {
    if (typeof obj == 'string'){
      return ""
    } else {
      // serialize |obj| however you want
      return `[${typeof obj}] ${JSON.stringify(obj)}`;
    }
  }, jsHandle);
}


// bind console output for startBrowser() page
export function routeLogsToContainer(page) {
  // page.on('console', msg => {
  //   console.log(textWithColor("console:", ANSIColor.Cyan), msg.text())
  // });
  page.on('console', async msg => {
    const args = await Promise.all(msg.args().map(arg => describe(arg)))
    console.log(textWithColor("console:", ANSIColor.Cyan), msg.text(), ...args);
  });

  page.on('pageerror', error => {
    console.log(textWithColor("page error:", ANSIColor.Red), error.message);
  });
  // page.on('response', response => {
  //   console.log(textWithColor("response:", ANSIColor.Purple), response.status(), response.url());
  // });
  page.on('requestfailed', request => {
    console.log(textWithColor("requestfailed:", ANSIColor.Yellow), request.failure().errorText, request.url());
  });
}