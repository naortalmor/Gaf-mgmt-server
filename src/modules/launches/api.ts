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
                let restaurantSurveyGet = AbstractServer.db.ref('restaurant-survey');
                let restaurantSurveySet = AbstractServer.db.ref('restaurant-survey').push();

                restaurantSurveyGet.on('value', (survey) => {
                    const newVote:{ ids:number[], voterId:string } = req.body;
                    const surveyDbValue = survey.val();
                    const dbRestaurant:string[] = Object.keys(surveyDbValue);

                    console.log(Object.values(surveyDbValue));
                    console.log(Object.keys(surveyDbValue));

                    newVote.ids.forEach((restaurantId:number) => {
                        if (dbRestaurant.find(res => res === restaurantId.toString())) {
                            //update existed val
                            const DbVoters:string[] = surveyDbValue[surveyDbValue];
                            const newVoters:string[] = [...DbVoters, newVote.voterId];
                            restaurantSurveyGet.update({restaurantId: newVoters});

                        } else {
                            // insert new val
                            restaurantSurveySet.set({restaurantId:[newVote.voterId]});
                        }
                    });
                });
            } catch (error) {
                res.status(500).send(`Error with saving new restaurant - ${error}`);
            }
        });

        app.get('/launches/getRestaurantSurvey', (req:Request, res:Response) => {
            try {
                let restaurantSurveyRef = AbstractServer.db.ref('restaurant-survey');
                restaurantSurveyRef.on('value', (restaurantSurvey) => {
                    res.status(200).send(Object.values(restaurantSurvey.val()).filter(curr => curr));
                });
            } catch (error) {
                res.status(500).send(`Error with getting all restaurants - ${error}`);
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
}