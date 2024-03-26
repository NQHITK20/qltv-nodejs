import express from "express";
import bodyParser from "body-parser";
import ViewEngine from "./config/viewEngine";
import initWebRoute from "./route/web";
import connect from "./config/connectDB";
import connectDB from "./config/connectDB";
// import cors from "../node_modules/cors/lib/index"

require('dotenv').config();
const cors = require('cors');

let app = express();
// app.use(cors({ credentials: true, origin: true }));

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());


ViewEngine(app);
initWebRoute(app);

connectDB();
let port = process.env.PORT;
app.listen(port, () => {
    // callback
    console.log("Backend chạy thành công trên cổng", +port);
})


