import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as env from 'dotenv';
import * as admin from 'firebase-admin';

export class AbstractServer {
    public static db;

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
            credential: admin.credential.cert({projectId: 'gaf-mgmt', clientEmail: 'firebase-adminsdk-k7r08@gaf-mgmt.iam.gserviceaccount.com',
        privateKey:'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/ptAEcFwpJdtr\n57BQ06ru7ov+iDIVDioYlP2YmcpmnyfmV2iAhYMmCeFkKmzeU57IFUyv0/cHvAqe\nHamXy+fWgzSpn1eSNCcYDgET8R2C2L2SOjBIPfmI+kDgZB1WPCsN6pOPLZ2wLy9E\ngOZqmS0VozWu1Jvre0spg/Kl6CcUltTvseuZvZim/usdYVXAK/3nhErFAokUX3A+\n13Cw++vXOXdNO6N9kFqUg/ZyJJJbvaSKFGd7jkZtI03l7ILuRBTntH4NEhZr+7B2\nlitt/bykIbRWxK9lqKVi3Aw6xPYUuqadQwPR5V23b/jkJy4bLjXRjgBDXsd8SOvT\nVw9sgsWZAgMBAAECgf9lgF4rUQF+dCOsbR4JsLuW+j//+Pc4BN3GpyH9msssuUjT\nIE1NxBLxfR93gqtQvyNuVIQzmySktAfri0oxWuIueiQqByTEtK+qeGrvD4QnCHiz\njp3Y+k8ZJ3EKEVEi8DrdOUoX9SYkFC60g+WEuhtmmknpjjCwnAadYNniLvyDqh5g\nT2MD0u0mbmMGYkReg5KQMZ1YEQ97nUBj9m0K4rq9RW8onCI6nDWsUwOOiCLTwha1\nWK5a4x8kNWVd9sB4VLEojENHa3eEl68Int8F7/0eAhIhmOOJcF/ZbLYHppP6bBtf\n7UJzaJ5RoJNGjGkcFDbW5nKZxYimFKmjdXwKOqUCgYEA6Isj8jNPVmtuNkLR3GbV\noYa7AedAGptUHHlH4C0dOQRPmDj1O5JCmCOSP724Hw24NFTTKHo616tYgqGbAu10\nR7/Eombjp1uFKfaysWVyaU5CrglCK0MbR2pY3KGwGVU4PM7V+naGLomJ2FibxkGr\ndQUZCU1tW5rEJd/OaW8hjkUCgYEA0vu9d8N+5Ag5oAJ8q7GMmPemLPHfP6XfTNbv\nu+6/gLWladUYsiztlJdFsoYT+SgkwFwVjj3GVqESACY3KAPNcyzVal+A4+6FkH0c\ndTLqp2ljT61UiJolDsEI0KXF1CpYjmEB8iTFK5pRUkrMqry8hDe1F19DxghS77Su\nVg+LCUUCgYEAghVbzWAAkLJWG8pzRRzNgqcws5beGEQt4CPEHlZ+U2fi8p9iJ6ng\n0OSNKlUBy3VMRxHwcWM2yXCTebfXU+LrOju/Tq3JydP7gQb83RmHz/q0eFC7kCHg\n/6kw/nMAZJt0cyetMYfd9eiAkOK4eUZBGJv6bma+txCzixBQklBVcBUCgYEAwL1V\nAvnHC84vxms/NSJHzN5AIsL7LYv8iJe5/jdHHu/SIvKXUv4UNDBVbZdq26y+ljQJ\nRR5N+InAhf5jWNzQbS1B8aE5gABAaBTDUJWpJDL0lK9FkF0xCV9zDBjEtuPQbpFU\nU78fmIurSsAmZLtyhF7Xwng208x655xpvxkH7PkCgYEA0bxu6AdLwVeGqettW08u\nabxbW326LPtOeOOGoSXGw5ct2+FThnzYYs/zJrInxRDNBTPauRxk2FZk/Q+zCpYk\nNEPD1WgI1InDc1Te3QKjiTB4eZZsjI5QoGkogbVE3RkqwZYStbTZf92BreA4MusJ\nz0gOpj05XAXIlkMAHdbnWPw=\n-----END PRIVATE KEY-----\n'.replace(/\\n/g, '\n')}),
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