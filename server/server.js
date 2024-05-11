require("dotenv").config();
const express = require("express");
const routes = require("./src/router/router");
const authRoute = require("./src/router/AuthRouter");
const contentRoute = require("./src/router/ContentRouter");
const cors = require("cors");
const app = express();
const passport = require("passport");
const session = require("express-session");
const authGoogle = require("./src/G_Oauth/passport");
const cookieParser = require("cookie-parser");


app.set('trust proxy', 1) // trust first proxy
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))



app.use(passport.initialize());
app.use(passport.session());

app.use(cors());



const port = 5000;
app.use(express.json());

app.use("/auth", authRoute);
app.use("/content", contentRoute);

app.get('/ping',(req,res)=>{
  res.send('pong')
})

// app.use('/api', routes);

app.listen(port, () => {
  console.log(`app is runnig ${port}`);
});
