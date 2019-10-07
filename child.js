let counter = 0

const handler = setInterval(() => {
  process.stdout.write(`${counter++}\n`)

  if (counter > 10000) {
    clearInterval(handler)
  }
}, 0)
