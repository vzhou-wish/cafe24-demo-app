const express = require("express")
const path = require("path")
const http = require("http")
const cors = require("cors")
const port = 3000

app = express()

app.use(cors())

app.use(express.static(path.join(__dirname, "./static")))

app.use('*', (req, res, next)=>{
    res.status(200).sendFile(path.join(__dirname, "./static/index.html"))
})

const server = http.createServer(app)

server.listen(port)