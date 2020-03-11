import { MifgafUser } from "../model/mifgaf-user";
import { HistoryRecord } from "../model/history-record";

export function getHistory(): HistoryRecord[] {
    return [
        {
            userId: '1',
            date: (new Date()).getTime()
        },
        {
            userId: '2',
            date: (new Date()).getTime()
        },
        {
            userId: '3',
            date: (new Date()).getTime()
        },
        {
            userId: '4',
            date: (new Date()).getTime()
        }
    ];
}

export function getUsers(): MifgafUser[] {
    // active users only
    return [
        {
            id: '1',
            email: '1',
            name: 'lior',
            teamId: 1,
            typeId: 1,
            startingRound: 0
        },
        {
            id: '2',
            email: '2',
            name: 'tamir',
            teamId: 1,
            typeId: 0,
            startingRound: 0
        },
        {
            id: '3',
            email: '1',
            name: 'naor',
            teamId: 1,
            typeId: 1,
            startingRound: 0
        },
        {
            id: '4',
            email: '2',
            name: 'saeed',
            teamId: 1,
            typeId: 1,
            startingRound: 0
        },
        {
            id: '5',
            email: '1',
            name: 'ran',
            teamId: 1,
            typeId: 1,
            startingRound: 0
        },
        {
            id: '6',
            email: '2',
            name: 'aya',
            teamId: 1,
            typeId: 0,
            startingRound: 0
        },
        {
            id: '7',
            email: '2',
            name: 'raz',
            teamId: 1,
            typeId: 1,
            startingRound: 0
        }
    ];
}