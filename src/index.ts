import { AbstractServer } from "./abstract-server/abstract-server";
import * as express from 'express';
import { Routes } from "./routes/routes";

class GafMgmtServer {
    static run() {
        AbstractServer.init(GafMgmtServer.initApp)
    }

    static initApp(app:express.Application) {
        Routes.init(app);
    }
}

GafMgmtServer.run();