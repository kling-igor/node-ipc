const { createWriteStream } = require('fs')
const stream = createWriteStream(null, { fd: 3 })

stream.write(JSON.stringify({ root: { arr: [] } }))

let counter = 0

const handler = setInterval(() => {
  const obj = { val: 42 }
  stream.write(JSON.stringify({ commit: obj }) + '\n')

  if (counter++ > 10) {
    clearInterval(handler)
  }
}, 0)
