import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as env from 'dotenv';
import * as admin from 'firebase-admin';

export class AbstractServer {
    static db;

    static init(callback: Function) {
        let app = express();
        app.use(bodyParser.json());
        AbstractServer.initCors(app);
        env.config();
        const port = process.env.PORT || 1112;
        this.initDbConnection();
        app.listen(port, () => {
            console.log(`server is listening on port: ${port}`);
            callback(app);
        });
    }

    private static initDbConnection(): void {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
            databaseURL: 'https://gaf-mgmt.firebaseio.com/'
        });

        AbstractServer.db = admin.database();
    }

    private static initCors(app: express.Application) {
        app.use((req, res, next) => {
            res.setHeader('Content-Type', 'text/plain');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            next();
        })
    }
}