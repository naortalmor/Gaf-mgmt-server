import { EveningsApi } from '../modules/evenings/api';
import { LaunchesApi } from '../modules/launches/api';
import * as express from 'express';
import { Request, Response } from 'express';
import { MifgafimApi } from '../modules/mifgafim/api';

export class Routes {
    static async init(app:express.Application) {
        app.get('/', Routes.defaultApi);
        MifgafimApi.init(app);
        LaunchesApi.init(app);
        EveningsApi.init(app);
    }

    private static defaultApi(req:Request, res:Response) {
        res.status(200).send('Gaf Mgmt Server Is Running');
    }
}