import { MifgafUser } from "../model/mifgaf-user";
import { getHistory, getUsers } from "./history";
import { HistoryRecord } from "../model/history-record";
import { Plan } from "../model/plan";

function getHighscores(): MifgafUser[] {
    let users: MifgafUser[] = getUsers();
    let usersDictionary: { [id: string]: MifgafUser } = {};
    users.forEach((user: MifgafUser) => {
        usersDictionary[user.id] = user;
        user.currentRound = user.startingRound;
        user.latestDate = 0;
    });
    getHistory().forEach((historyRecord: HistoryRecord) => {
        usersDictionary[historyRecord.userId].currentRound++;
        usersDictionary[historyRecord.userId].latestDate = historyRecord.date;
    });

    return sortHighscores(Object.values(usersDictionary));
}

function sortHighscores(unsortedHighscores: MifgafUser[]): MifgafUser[] {
    return unsortedHighscores.sort((a, b) => a.currentRound - b.currentRound || a.latestDate - b.latestDate);
}

function getCurrentRound(): number {
    return Math.min(...getHighscores().map((user: MifgafUser) => user.currentRound));
}

export function generateNextMifgafs(howNext: number = 4): Plan[] {
    let highscores: MifgafUser[] = getHighscores();
    const mifgafBringersTypes: number[] = [0, 1, 1];
    let latestDate: number = Math.max(...highscores.map(u => u.latestDate));
    latestDate++;

    let plans: Plan[] = new Array(howNext);
    for (let pIndex = 0; pIndex < plans.length; pIndex++) {
        plans[pIndex] = {
            bringers: new Array(mifgafBringersTypes.length)
        }
        let plan = plans[pIndex];
        mifgafBringersTypes.forEach((_, bringerIndex: number) => {
            //console.log(highscores.map(u => `${u.id}(${u.currentRound})`));
            
            let round: number = highscores.find((user: MifgafUser) => {
                return user.typeId === mifgafBringersTypes[bringerIndex]
            }).currentRound;
            let possibleUsers: MifgafUser[] = highscores.filter((user: MifgafUser) => {
                return user.typeId === mifgafBringersTypes[bringerIndex] &&
                    user.currentRound === round;
            });
            let from = Math.min(possibleUsers.length, 2);
            let chosenIndex = Math.floor(Math.random() * from);
            let chosenUser: MifgafUser = possibleUsers[chosenIndex];

            /*let chosenUser: MifgafUser = highscores.find((user: MifgafUser) => {
                return user.typeId === mifgafBringersTypes[bringerIndex]
            });*/

            plan.bringers[bringerIndex] = chosenUser.id;
            chosenUser.currentRound++;
            chosenUser.latestDate = latestDate;
            latestDate++;
            highscores = sortHighscores(highscores);
        });
    };
    return plans;
}
