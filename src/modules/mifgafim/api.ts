import * as express from 'express';
import {Request, Response} from "express";
import { getHistory } from './src/history';
import { test } from './src/this-week-persons';
import { getAllUsers } from './src/users';

export class MifgafimApi {
    static init(app:express.Application):void {
        app.get('/mifgafim/getHistory', (req:Request, res:Response) => {
            res.send(getHistory());
        });
        app.get('/mifgafim/test', (req:Request, res:Response) => {
            res.send(test());
        });
        app.get('/mifgafim/getAllUsers', (req:Request, res:Response) => {
            res.send(getAllUsers());
        });
    }
}