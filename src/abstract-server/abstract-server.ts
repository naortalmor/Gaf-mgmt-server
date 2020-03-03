import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as env from 'dotenv';

export class AbstractServer {
    static init(callback:Function) {
        let app = express();
        app.use(bodyParser.json());
        AbstractServer.initCors(app);
        env.config();
        const port = process.env.PORT || 1112;
        app.listen(port, (err) => {
            if(err) {
                console.log(err)
            } else {
                console.log(`server is listening on port: ${port}`);
                callback(app);
            }
        });
    }

    private static initCors(app:express.Application) {
        app.use((req,res,next) => {
            res.setHeader('Content-Type', 'text/plain');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            next();
        })
    }
}