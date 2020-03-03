"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
class AbstractServer {
    static init(callback) {
        let app = express();
        app.use(bodyParser.json());
        AbstractServer.initCors(app);
        env.config();
        const port = process.env.PORT || 1112;
        app.listen(port, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(`server is listening on port: ${port}`);
                callback(app);
            }
        });
    }
    static initCors(app) {
        app.use((req, res, next) => {
            res.setHeader('Content-Type', 'text/plain');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            next();
        });
    }
}
exports.AbstractServer = AbstractServer;
//# sourceMappingURL=abstract-server.js.map