import * as express from 'express';
import { Request, Response } from 'express';
import { AbstractServer } from '../../abstract-server/abstract-server';


export class LaunchesApi {
    static init(app:express.Application):void {
        app.get('/launches/getRestaurants', (req:Request, res:Response) => {
            try {
                let restaurantRef = AbstractServer.db.ref('restaurant');
                restaurantRef.on('value', (restaurants) => {
                    res.status(200).send(Object.values(restaurants.val()).filter(curr => curr));
                });
            } catch (error) {
                console.log(`Error with getting all restaurants - ${error}`);
                res.status(500).send(`Error with getting all restaurants - ${error}`);
            }
        });

        app.post('/launches/addRestaurants', (req:Request, res:Response) => {
            try {
                let restaurantRef = AbstractServer.db.ref('restaurant').push();
                const newRestaurant = {...req.body, id: restaurantRef.key};
                restaurantRef.set(newRestaurant);
                res.send(newRestaurant);
            } catch (error) {
                console.log(`Error with saving new restaurant - ${error}`);
                res.status(500).send(`Error with saving new restaurant - ${error}`);
            }
        });

        app.post('/launches/updateRestaurantSurveyStatus', (req:Request, res:Response) => {
            try {
                let statusesRef = AbstractServer.db.ref('statuses');
                const newStatus = req.body.newStatus;

                statusesRef.update({restaurantSurveyStatus:newStatus}).then(result => res.send(newStatus)).catch(error => res.status(500).send(`Error with saving new restaurant - ${error}`));
            } catch (error) {
                console.log(`Error with saving new restaurant - ${error}`);
                res.status(500).send(`Error with saving new restaurant - ${error}`);
            }
        });

        app.get('/launches/getRestaurantSurveyStatus', (req:Request, res:Response) => {
            try {
                let statusesRef = AbstractServer.db.ref('statuses');
                statusesRef.on('value', (status) => {
                    res.status(200).send(Object.values(status.val()).filter(curr => curr));
                });
            } catch (error) {
                console.log(`Error with getting all restaurants - ${error}`);
                res.status(500).send(`Error with getting all restaurants - ${error}`);
            }
        });
    }
}