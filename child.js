let counter = 0

const handler = setInterval(() => {
  process.stdout.write(`${counter++}\n`)

  if (counter > 100) {
    clearInterval(handler)
  }
}, 0)
