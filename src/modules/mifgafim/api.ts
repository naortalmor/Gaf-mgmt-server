import * as express from 'express';
import {Request, Response} from "express";
import { getHistory } from './src/history';

export class MifgafimApi {
    static init(app:express.Application):void {
        app.get('/mifgafim/getHistory', (req:Request, res:Response) => {
            res.send(getHistory());
        });
    }
}