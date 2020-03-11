import * as express from 'express';
import { getMifgafimHistory } from './query/history';

export class MifgafimModule {
    static async init(app:express.Application) {
        app.get('/mifgafim/getHistory', getMifgafimHistory);
    }
}