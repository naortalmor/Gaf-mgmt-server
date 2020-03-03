import * as express from 'express';
import {Request, Response} from "express";
import { AbstractServer } from '../abstract-server/abstract-server';

export class Routes {
    static async init(app:express.Application) {
        app.get('/', Routes.defaultApi);
        app.get('/allUsers', Routes.getAllUsers);
    }

    private static defaultApi(req:Request, res:Response) {
        res.status(200).send('Gag Mgmt Server Is Up Running');
    }

    private static getAllUsers(req:Request, res:Response): void {
        try {
            let usersRef = AbstractServer.db.ref('users');
            usersRef.on('value', (users) => {
                res.status(200).send(users.val())
            })
        } catch (error) {
            console.log(`Error with getting all users - ${error}`);
            res.status(500).send(`Error with getting all users - ${error}`)
        }
    }
}