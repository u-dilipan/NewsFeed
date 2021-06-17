const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const seedFile = path.join(__dirname, 'seed.json')
const postFile = path.join(__dirname, 'posts.json')
if (!fs.existsSync(seedFile)) {
  console.log('seed file not found')
  process.exit(1)
}

let seedData = require(seedFile)

if (!fs.existsSync(postFile) || seedFile.length === 0) {
  seedData = seedData.map((data) => {
    return {
      id: uuidv4(),
      ...data,
    }
  })
  fs.writeFileSync('posts.json', JSON.stringify(seedData), function (err) {
    if (err) throw err
    else console.log('data injected')
  })
}

const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()

app.use(cors())

app.use(express.json())

app.use('/', routes)

app.use('/images', express.static(path.join(__dirname, 'images')))

app.listen(4000, function () {
  console.log('Server running on port 4000')
})
