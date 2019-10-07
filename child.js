const fs = require('fs')
const stream = fs.createWriteStream(null, { fd: 3 })

let counter = 0

const handler = setInterval(() => {
  // process.stdout.write(`${counter++}\n`)

  // process.stdout.write({ val: 42 })

  // stream.write({ val: 42 })
  stream.write(`HELLO_${counter++} `)

  if (counter > 10) {
    clearInterval(handler)
  }
}, 0)
