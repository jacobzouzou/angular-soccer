export interface iSchedule{
    id:number;
    playingDate:Date;
    homeTeam:string;
    awayTeam:string;
    homeScore:number;
    awayScore:number;
    refName:string;
    notes?:string;
}