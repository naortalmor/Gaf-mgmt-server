import { MifgafUser } from "../model/mifgaf-user";
import { getHistory } from "./history";

export function getHighscores(): MifgafUser[] {
    let users = [];
    let history = getHistory();

    return [];
}

function getCurrentRound(): number {
    return Math.min(...getHighscores().map((user: MifgafUser) => user.currentRound));
}