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
                console.log(`Error with getting all evenings - ${error}`);
                res.status(500).send(`Error with getting all evenings - ${error}`)
            }
        });

        app.get('/events/getAllEvents', (req:Request, res:Response) => {
            try {
                let eventsRef = AbstractServer.db.ref('calendar-event');
                eventsRef.on('value', (events) => {
                    res.status(200).send(Object.values(events.val()).filter(curr => curr))
                })
            } catch (error) {
                console.log(`Error with getting all events - ${error}`);
                res.status(500).send(`Error with getting all events - ${error}`)
            }
        })

        app.post('/evenings/addEvent', (req:Request, res:Response) => {
            try {
                let eventsRef = AbstractServer.db.ref('calendar-event').push();
                const newCalenderEvent = {...req.body, id: eventsRef.key};
                eventsRef.set(newCalenderEvent).then(() => {
                    res.send(newCalenderEvent)
                }
                ).catch((error) => {
                    console.log(`Error with saving new restaurant - ${error}`);
                    res.status(500).send(`Error with saving new restaurant - ${error}`)
                })
            } catch (error) {
                console.log(`Error with saving new restaurant - ${error}`);
                res.status(500).send(`Error with saving new restaurant - ${error}`)
            }
        })
    }
}