const express = require('express')
const app = express()
const port = 3000

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.use(function (req, res, next) {
  res.on('finish', function () {
    console.log(`${new Date().toLocaleString()} | ${req.method} from ${req.originalUrl} | total time: ${Date.now() - req.requestTime}ms`)
  })
  next()
})

app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
