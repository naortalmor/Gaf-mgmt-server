import { AbstractServer } from "../../../abstract-server/abstract-server";

export function getAllUsers() {
    let a;
            let usersRef = AbstractServer.db.ref('users');
            usersRef.on('value', async (users) => {
                a = await users.val();
            })
            return a;
        }
