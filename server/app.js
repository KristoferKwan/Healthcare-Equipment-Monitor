const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dbConnection = require("./database");
const withAuth = require("./middleware/auth");

const passport = require("./passport");
const app = express();
const PORT = 8080;
// Route requires
app.use(cors());
app.options("*", cors());
const server = http.createServer(app);
const helper = require("./routes/util");
const user = require("./routes/user");
const hospital = require("./routes/hospital");

// MIDDLEWARE
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Sessions
app.use(
  session({
    secret: "fraggle-rock", //pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false, //required
    saveUninitialized: false //required
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Routes
app.use("/user", user);
app.use("/hospital", hospital);
app.use("/util", util);

// Starting Server
server.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
