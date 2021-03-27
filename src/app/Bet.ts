export class Bet{
    isActive!: boolean;
    teamID!: string;
    //matchID!: string; //I dont think we have a matchID so this should not be necessary unless you guys
                      //want to add one.
    bettedAmount!: number;
    //userID!: string; //I think this is useless since we can store it as a member of our users.
}