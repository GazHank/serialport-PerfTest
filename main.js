/* ----------------------------------- *
 * V10 Syntax                          *
 * ----------------------------------- */

const { SerialPort } = require('serialport')
const { DelimiterParser } = require("@serialport/parser-delimiter");

const port = new SerialPort({
    path: 'COM4',
    baudRate: 115200,
  })


/* ----------------------------------- *
 * V9 Syntax                           *
 * ----------------------------------- */

// const SerialPort = require('serialport')
// const DelimiterParser = require("@serialport/parser-delimiter");

// const port = new SerialPort('COM4',{
//   baudRate: 115200
// })

/* ----------------------------------- *
 * No Syntax changes beyond this point *
 * ----------------------------------- */

const { version } = require('./node_modules/serialport/package.json');

console.log("Let's test performance on serialport:", version, '\n');

const Messages = 10000
const Responses = Messages * 2 + 4

var count = 0
var start, end = 0
var startRead, endRead

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message)
})

parser = port.pipe(new DelimiterParser({ delimiter: "\n" }));
  
parser.on("data", data => {
  data = data.toString("utf-8");
  // debug line if you really want to check the responses
  // 
  // console.log("incoming data:", data);
  //
  count++
  if (count == 1 ) {
    startRead = Date.now()
    console.log('first message read:',startRead,'\n')
  }
  if (count == Responses ) {
    endRead = Date.now()
    console.log('last message read:', endRead,'\n')
    console.log('messages written:', Messages, 'messages read:', count, '\n')
    console.log('write duration (ms):', end - start)
    console.log('read duration (ms):', endRead - startRead)
    process.exit()
  }
  if (data == ".") {
      let result = result,
      resolve = callbacks.shift();

    this.result = "";
    if (resolve) {
      resolve(result);
    }
  }
});

// write first message
port.write('hardware.layout\n', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  start = Date.now()
  console.log('first message written:',start)
})

// write lots of messages
for (var i = 0; i < Messages; i++) {
  port.write('version\n', function(err) {
      if (err) {
        return console.log('Error on write: ', err.message)
      }
    })
}

// write last message
port.write('hardware.layout\n', function(err) {    
  if (err) {
  return console.log('Error on write: ', err.message)
}
end = Date.now()
console.log('last message written:', end)
})
