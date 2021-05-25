const express = require("express")
const path = require("path")
const http = require("http")
const cors = require("cors")
const port = process.env.PORT || 3000

const { auth } = require("./middleware/auth");
const { fontController } = require("./controllers/fontController");
const { adminController } = require("./controllers/adminController")
const OAuthRouter = require("./routers/OAuthRouter");

const corsConfig = {
  origin: "https://guarded-beyond-10106.herokuapp.com",
  optionsSuccessStatus: 200
}

app = express()

app.use(cors(corsConfig))

app.use(express.static(path.join(__dirname, "./static")))

app.use('/auth', OAuthRouter)

app.get('/font', fontController)

app.get("/admin", auth, adminController)

//catch-all endpoint
app.use('*', (req, res, next)=>{
    res.status(200).sendFile(path.join(__dirname, "./static/index.html"))
})

// global error handler
app.use((err, req, res, next) => {
    const errorMsg = {
      message: err.message || 'Express error handler caught unkown middleware error!',
      status: err.status || 500,
    };
    return res.status(errorMsg.status).json(errorMsg);
  });

const server = http.createServer(app)

server.listen(port)