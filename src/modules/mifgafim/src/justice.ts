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
    });
    getHistory().forEach((historyRecord: HistoryRecord) => {
        usersDictionary[historyRecord.userId].currentRound++;
        usersDictionary[historyRecord.userId].latestDate = historyRecord.date;
    });

    return sortHighscores(Object.values(usersDictionary));
}

function sortHighscores(unsortedHighscores: MifgafUser[]): MifgafUser[] {
    return unsortedHighscores.sort((a, b) => a.currentRound - b.startingRound || a.latestDate - b.latestDate);
}

function getCurrentRound(): number {
    return Math.min(...getHighscores().map((user: MifgafUser) => user.currentRound));
}

export function generateNextMifgafs(howNext: number = 4): void {
    let highscores: MifgafUser[] = getHighscores();
    const mifgafBringersTypes: number[] = [0, 1, 1];

    let plans: Plan[] = new Array(howNext);
    plans.forEach((plan: Plan) => {
        plan.bringers = new Array(mifgafBringersTypes.length);
        plan.bringers.forEach((bringer: string, bringerIndex: number) => {
            let round: number = highscores.find((user: MifgafUser) => {
                return user.typeId === mifgafBringersTypes[bringerIndex]
            }).currentRound;
            let possibleUsers: MifgafUser[] = highscores.filter((user: MifgafUser) => {
                return user.typeId === mifgafBringersTypes[bringerIndex] &&
                    user.currentRound === round;
            });
            let chosenUser: MifgafUser = possibleUsers[Math.floor(Math.random() * Math.min(possibleUsers.length, mifgafBringersTypes.length))];
            plan.bringers[bringerIndex] = chosenUser.id;
            chosenUser.currentRound++;
            highscores = sortHighscores(highscores);
        });
    });
}
