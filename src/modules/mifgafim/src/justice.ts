import { MifgafUser } from "../model/mifgaf-user";
import { getHistory, getUsers } from "./history";
import { HistoryRecord } from "../model/history-record";
import { Plan } from "../model/plan";

async function getHighscores(): Promise<MifgafUser[]> {
        let users:MifgafUser[] = (await getUsers());
    console.log(users);
    let usersDictionary: { [id: string]: MifgafUser } = {};
    users.forEach((user) => {
            usersDictionary[user.id] = user;
        user.currentRound = user.startingRound || 0;
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


export async function generateNextMifgafs(howNext: number = 4): Promise<Plan[]> {
    let highscores: MifgafUser[] =  await getHighscores();
    const mifgafBringersTypes: number[] = [0, 1, 1];
    let latestDate: number = Math.max(...highscores.map(u => u.latestDate));
    latestDate++;

    let plans: Plan[] = new Array(howNext);
    for (let pIndex = 0; pIndex < plans.length; pIndex++) {
        plans[pIndex] = new Array(mifgafBringersTypes.length);
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

            plan[bringerIndex] = chosenUser;
            chosenUser.currentRound++;
            chosenUser.latestDate = latestDate;
            latestDate++;
            highscores = sortHighscores(highscores);
        });
    };
    return plans;
}
