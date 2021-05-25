const express = require("express")
const path = require("path")
const http = require("http")
const cors = require("cors")
const port = process.env.PORT || 3000

const {getInfoController} = require("./controllers/getInfoController");
const { OAuthRouter } = require("./routers/OAuthRouter");

const corsConfig = {
  origin: "https://guarded-beyond-10106.herokuapp.com",
  optionsSuccessStatus: 200
}

app = express()

app.use(cors(corsConfig))

app.use(express.static(path.join(__dirname, "./static")))

app.use('/auth', OAuthRouter)

app.get('/get-info', getInfoController)

//catch-all endpoint
app.use('*', (req, res, next)=>{
    res.status(200).sendFile(path.join(__dirname, "./static/index.html"))
})

// global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unkown middleware error!',
      status: 500,
      message: { err: 'An error occurred!' },
    };
    const errorObj = Object.assign(defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

const server = http.createServer(app)

server.listen(port)