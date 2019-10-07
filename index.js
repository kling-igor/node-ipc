const { Writable } = require('stream')
const { spawn, fork } = require('child_process')
const path = require('path')

const writer = new (class extends Writable {
  constructor(opts) {
    super(opts)
    this.data = []
  }

  _write(chunk, encoding, next) {
    const str = chunk.toString()

    const splitted = str.split('\n')
    for (const item of splitted) {
      try {
        const trimmed = item.trim()
        if (trimmed) {
          const obj = JSON.parse(trimmed)
          this.data.push(obj)
        }
      } catch (e) {
        console.log('ERR:', e)
      }
    }

    next()
  }
})()

;(async () => {
  const child = spawn(process.execPath, [path.resolve(__dirname, './child.js')], {
    stdio: ['ignore', 'ignore', 'ignore', 'pipe']
  })

  child.on('close', () => {
    console.log('DONE', writer.data)
  })

  // child.stdout.pipe(writer /*process.stdout*/)
  child.stdio[3].pipe(writer)
})()
