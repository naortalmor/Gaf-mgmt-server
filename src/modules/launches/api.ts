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

                statusesRef.update({restaurantSurveyStatus: newStatus}).then(result => res.send(newStatus)).catch(error => res.status(500).send(`Error with saving new restaurant - ${error}`));
            } catch (error) {
                console.log(`Error with update restaurant survey- ${error}`);
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
                console.log(`Error with getting restaurant survey - ${error}`);
                res.status(500).send(`Error with getting all restaurants - ${error}`);
            }
        });

        app.post('/launches/updateRestaurantSurvey', (req:Request, res:Response) => {
            try {
                let restaurantSurveyRef = AbstractServer.db.ref('restaurant-survey');
                const newVote:{ id:number, voterId:string } = req.body;

                restaurantSurveyRef.on('value', (restaurantSurvey) => {
                    let ans = restaurantSurvey.find(res => res.id === newVote.id);
                    if (ans) {
                        ans.voterId.push(newVote.voterId);
                    } else {
                        ans = newVote;
                    }
                    let surveyRef = AbstractServer.db.ref('restaurant-survey').push();
                    surveyRef.set(ans).then(result => res.send(result)).catch(error => res.status(500).send(`Error with saving new restaurant - ${error}`));
                });
            } catch (error) {
                console.log(`Error with updating restaurant survey - ${error}`);
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
                console.log(`Error with getting restaurant survey - ${error}`);
                res.status(500).send(`Error with getting all restaurants - ${error}`);
            }
        });
    }
}