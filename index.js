const { Writable } = require('stream')
const { spawn, fork } = require('child_process')
const path = require('path')

const writer = new (class extends Writable {
  // constructor() {
  //   // super({ objectMode: true /*highWaterMark: 16*/ })
  // }
  _write(chunk, encoding, next) {
    console.log(chunk.toString())
    next()
  }
})()

;(async () => {
  const child = spawn(process.execPath, [path.resolve(__dirname, './child.js')], {
    stdio: ['ignore', 'ignore', 'ignore', 'pipe']
  })

  child.on('close', () => {
    console.log('DONE')
  })

  // child.stdout.pipe(writer /*process.stdout*/)
  child.stdio[3].pipe(writer)
})()
