import * as express from 'express';
import {Request, Response} from "express";
import { AbstractServer } from '../../abstract-server/abstract-server';

export class EveningsApi {
    static init(app:express.Application):void {
        app.get('/evenings/getTeamEvenings', (req:Request, res:Response) => {
            try {
                let eveningsRef = AbstractServer.db.ref('evenings');
                eveningsRef.on('value', (evenings) => {
                    res.status(200).send(Object.values(evenings.val()).filter(curr => curr))
                })
            } catch (error) {
                console.log(`Error with getting all restaurants - ${error}`);
                res.status(500).send(`Error with getting all restaurants - ${error}`)
            }
        });
    }
}