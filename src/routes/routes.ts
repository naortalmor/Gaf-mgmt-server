import * as express from 'express';
import {Request, Response} from "express";

export class Routes {
    static async init(app:express.Application) {
        app.get('/', Routes.defaultApi);
    }

    private static defaultApi(req:Request, res:Response) {
        res.status(200).send('Gag Mgmt Server Is Up Running');
    }
}