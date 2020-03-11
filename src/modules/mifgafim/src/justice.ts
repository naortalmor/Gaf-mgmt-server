import { MifgafUser } from "../model/mifgaf-user";
import { getHistory, getUsers } from "./history";

function getHighscores(): MifgafUser[] {
    let users: MifgafUser[] = getUsers();
    let usersDictionary: { [id: string]: MifgafUser } = {};
    users.forEach((user: MifgafUser) => {
        usersDictionary[user.id] = user;
        user.currentRound = user.startingRound;
    });
    getHistory().forEach(historyRecord => {
        usersDictionary[historyRecord.userId].currentRound++;
        usersDictionary[historyRecord.userId].latestDate = historyRecord.date;
    });

    return Object.values(usersDictionary)
        .sort((a, b) => a.currentRound - b.startingRound);
}

function getCurrentRound(): number {
    return Math.min(...getHighscores().map((user: MifgafUser) => user.currentRound));
}

function generateNextMifgafs():void {
    
}