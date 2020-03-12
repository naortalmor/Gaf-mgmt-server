import { MifgafUser } from "../model/mifgaf-user";
import { HistoryRecord } from "../model/history-record";
import { AbstractServer } from "../../../abstract-server/abstract-server";

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

export function getUsers():Promise<MifgafUser[]> {
return new Promise(function (resolve,reject) {
    let usersRef = AbstractServer.db.ref('users');
            usersRef.on('value', (users) => {
                resolve(Object.values(users.val()));
            });
})
}