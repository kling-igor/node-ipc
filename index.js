const { Writable } = require('stream')
const { spawn, fork } = require('child_process')
const path = require('path')

const writer = new (class extends Writable {
  constructor(opts) {
    super(opts)
    this.data = {}
  }

  _write(chunk, encoding, next) {
    const str = chunk.toString()

    const splitted = str.split('\n')
    for (const item of splitted) {
      try {
        const trimmed = item.trim()
        if (trimmed) {
          const obj = JSON.parse(trimmed)

          const { root, commit } = obj

          if (root) {
            this.data = root
          } else if (commit) {
            this.data.arr.push(commit)
          }
        }
      } catch (e) {
        console.log('ERR:', e)
      }
    }

    next()
  }
})()

;(async () => {
  const result = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.resolve(__dirname, './child.js')], {
      stdio: ['ignore', 'ignore', 'ignore', 'pipe']
    })

    child.once('close', () => {
      resolve(writer.data)
    })

    child.once('error', reject)

    child.stdio[3].pipe(writer)
  })

  console.log('RESULT:', result)
})()
