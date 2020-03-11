import * as express from 'express';
import {Request, Response} from "express";
import { AbstractServer } from '../../abstract-server/abstract-server';


export class LaunchesApi {
    static init(app:express.Application):void {
        app.get('/launches/getRestaurants', (req:Request, res:Response) => {
            try {
                let usersRef = AbstractServer.db.ref('restaurant');
                usersRef.on('value', (users) => {
                    console.log(users.val());
                    res.status(200).send(users.val())
                })
            } catch (error) {
                console.log(`Error with getting all restaurants - ${error}`);
                res.status(500).send(`Error with getting all restaurants - ${error}`)
            }
        });
    }
}