"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_server_1 = require("../abstract-server/abstract-server");
class Routes {
    static init(app) {
        return __awaiter(this, void 0, void 0, function* () {
            app.get('/', Routes.defaultApi);
            app.get('/allUsers', Routes.getAllUsers);
        });
    }
    static defaultApi(req, res) {
        res.status(200).send('Gag Mgmt Server Is Up Running');
    }
    static getAllUsers(req, res) {
        try {
            let usersRef = abstract_server_1.AbstractServer.db.ref('users');
            usersRef.on('value', (users) => {
                res.status(200).send(users.val());
            });
        }
        catch (error) {
            console.log('Error with getting all users');
            res.status(500).send('Error with getting all users');
        }
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map