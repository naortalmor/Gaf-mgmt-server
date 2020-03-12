import * as express from 'express';
import {Request, Response} from "express";
import { getHistory } from './src/history';
import { thisWeekPersons } from './src/this-week-persons';
import { generateNextMifgafs } from './src/justice';
import { AbstractServer } from '../../abstract-server/abstract-server';

export class MifgafimApi {
    static init(app:express.Application):void {
        app.get('/mifgafim/getHistory', (req:Request, res:Response) => {
            res.send(getHistory());
        });
        app.get('/mifgafim/thisWeekPersons', (req:Request, res:Response) => {
            res.send(thisWeekPersons());
        });
        app.get('/mifgafim/getAllUsers', (req:Request, res:Response) => {
            let usersRef = AbstractServer.db.ref('users');
            usersRef.on('value', (users) => {
                res.status(200).send(users.val())
            })
        });
        app.get('/mifgafim/winners', (req:Request, res:Response) => {
            let usersRef = AbstractServer.db.ref('winners');
            usersRef.on('value', (winners) => {
                res.send((winners.val()));
            })
            
        })
        app.get('/mifgafim/generateNextMifgafs/:howMuch', async (req:Request, res:Response) => {
            let howMuch:number = parseInt(req.params.howMuch);
            if (!isNaN(howMuch)) {
                let usersRef = AbstractServer.db.ref('winners');
                let insert = await generateNextMifgafs(howMuch);
                usersRef.set(insert);
                res.send(insert);
            } else {
                res.status(500).send();
            }
        });
    }
}