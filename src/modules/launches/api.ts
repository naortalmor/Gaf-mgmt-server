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
                res.status(500).send(`Error with saving new restaurant - ${error}`);
            }
        });

        app.post('/launches/updateRestaurantSurveyStatus', (req:Request, res:Response) => {
            try {
                let statusesRef = AbstractServer.db.ref('statuses');
                const newStatus:boolean = req.body.newStatus;

                statusesRef.update({restaurantSurveyStatus: newStatus}).then(result => res.send(newStatus))
                    .catch(error => res.status(500).send(`Error with saving new restaurant survey status - ${error}`));
            } catch (error) {
                res.status(500).send(`Error with saving new restaurant survey status - ${error}`);
            }
        });

        app.get('/launches/getRestaurantSurveyStatus', (req:Request, res:Response) => {
            try {
                let statusesRef = AbstractServer.db.ref('statuses');
                statusesRef.on('value', (status) => {
                    const statuses:boolean[] = Object.values(status.val());
                    res.status(200).send(statuses ? statuses[0] : false);
                });
            } catch (error) {
                res.status(500).send(`Error with getting all restaurants - ${error}`);
            }
        });

        app.post('/launches/updateRestaurantSurvey', (req:Request, res:Response) => {
            try {
                let restaurantSurvey = AbstractServer.db.ref('restaurant-survey');

                restaurantSurvey.once('value').then(dbSurvey => {
                    const newVote:{ ids:number[], voterId:string } = req.body;
                    const dbSurveyValues:Object = dbSurvey.val();
                    let updates:Object = {};
                    newVote.ids.forEach((restaurantId:number) => {
                        updates[restaurantId] = this.getNewVote(restaurantId.toString(), newVote.voterId, dbSurveyValues);
                    });

                    restaurantSurvey.update(updates)
                        .then(result => res.status(200).send(req.body));

                });
            } catch (error) {
                console.log(error);
                res.status(500).send(`Error with saving new restaurant survey vote - ${error}`);
            }
        });

        app.get('/launches/getRestaurantSurvey', (req:Request, res:Response) => {
            try {
                let restaurantSurveyRef = AbstractServer.db.ref('restaurant-survey');
                restaurantSurveyRef.on('value', (restaurantSurvey) => {
                    res.status(200).send(restaurantSurvey.val());
                });
            } catch (error) {
                res.status(500).send(`Error with getting restaurants survey- ${error}`);
            }
        });

        app.get('/launches/getDiningRoomOfToday', (req:Request, res:Response) => {
            try {
                let diningRoomRef = AbstractServer.db.ref('restaurant-survey/dining-room');
                diningRoomRef.on('value', (diningRoom) => {
                    -
                        res.status(200).send(diningRoom);
                });
            } catch (error) {
                res.status(500).send(`Error with getting dining room of today - ${error}`);
            }
        });
    }

    private static getNewVote(restaurantId:string, voterId:string, dbSurveyValues:Object):string[] {
        let newVoters:string[] = [voterId];
        if (dbSurveyValues[restaurantId]) {
            const DbVoters:string[] = dbSurveyValues[restaurantId];
            if (!DbVoters.find(dbVoter => dbVoter === voterId)) {
                newVoters = [...DbVoters, ...newVoters];
            } else {
                newVoters = DbVoters;
            }
        }

        return newVoters;
    }
}