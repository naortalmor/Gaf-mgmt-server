import * as express from 'express';
import {Request, Response} from "express";
import { getHistory } from './src/history';
import { thisWeekPersons } from './src/this-week-persons';
import { getAllUsers } from './src/users';
import { generateNextMifgafs } from './src/justice';

export class MifgafimApi {
    static init(app:express.Application):void {
        app.get('/mifgafim/getHistory', (req:Request, res:Response) => {
            res.send(getHistory());
        });
        app.get('/mifgafim/thisWeekPersons', (req:Request, res:Response) => {
            res.send(thisWeekPersons());
        });
        app.get('/mifgafim/getAllUsers', (req:Request, res:Response) => {
            res.send(getAllUsers());
        });
        app.get('/mifgafim/generateNextMifgafs/:howMuch', (req:Request, res:Response) => {
            let howMuch:number = parseInt(req.params.howMuch);
            if (!isNaN(howMuch)) {
                res.send(generateNextMifgafs(howMuch));
            } else {
                res.status(500).send();
            }
        });
    }
}