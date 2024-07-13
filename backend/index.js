const express = require("express");             //library express để tạo db
const cors = require("cors")
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");           //library mongoose để làm mongodb
const helmet = require("helmet");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");  // tao cookie va gan cookie
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const newRoute = require("./routes/new");
const rankRoute = require("./routes/ranking");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
const gptRoute = require("./routes/gpt");
const { json } = require("express");

dotenv.config();



mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODBURL, () => {
    console.log("Connected to Mongo DB");
})

app.use(express.json({ limit: '50mb' }));

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 50000, limit: "50mb" }));
app.use(express.json());    //de request va respond duoi dang jason
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());


//Routes
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/post", postRoute);
app.use("/v1/news", newRoute);
app.use("/v1/gpt", gptRoute);
app.use("/v1/rank", rankRoute);
app.use("/v1/conversations", conversationRoute);
app.use("/v1/message", messageRoute);

app.listen(process.env.PORT || 8000);


