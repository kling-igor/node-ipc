const { spawn, fork } = require('child_process')
const path = require('path')

;(async () => {
  const child = spawn(process.execPath, [path.resolve(__dirname, './child.js')], {
    stdio: ['pipe', 'pipe', 'pipe']
  })

  // child.stdout.on('data', data => {
  //   console.log('stdout: ' + data)
  // })

  child.on('close', () => {
    console.log('DONE')
  })

  child.stdout.pipe(process.stdout)
})()
