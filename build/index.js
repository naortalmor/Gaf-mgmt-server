"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_server_1 = require("./abstract-server/abstract-server");
const routes_1 = require("./routes/routes");
class GafMgmtServer {
    static run() {
        abstract_server_1.AbstractServer.init(GafMgmtServer.initApp);
    }
    static initApp(app) {
        routes_1.Routes.init(app);
    }
}
GafMgmtServer.run();
//# sourceMappingURL=index.js.map