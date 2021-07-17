type PlayID = 'hamlet' | 'as-like' | 'othello';
type Genre = 'comedy' | 'tragedy';

export type Play = {
    name: string;
    type: Genre;
};

export type Plays = {
    [playID in PlayID]: Play
};

export type Performance = {
    playID: PlayID;
    audience: number;
}
export type Invoice = {
    customer: string;
    performances: Performance[];
}
export type StatementData = {
    customer: string;
    // performances: Performance[];
    // plays: Plays;
}
