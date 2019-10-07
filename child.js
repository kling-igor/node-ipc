const fs = require('fs')
const stream = fs.createWriteStream(null, { fd: 3 })

let counter = 0

const handler = setInterval(() => {
  // process.stdout.write(`${counter++}\n`)

  const obj = { val: 42 }
  stream.write(JSON.stringify(obj) + '\n')

  if (counter++ > 10000) {
    clearInterval(handler)
  }
}, 0)
