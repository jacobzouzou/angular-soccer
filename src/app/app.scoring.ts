import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SoccerService } from './services/soccerService';
import { iSchedule } from './interfaces/schedule';
import {WebService} from './services/webService'

@Component({
    templateUrl: './views/scoring.html',
    styles: [` h3 {text-align:center;color:navy;
        font-size:x- large;margin:0px;font-weight:bold;}
        select { font-size:large;margin-left:25px;} `],
    providers: [Title, SoccerService, WebService]
})
export class AppScoring {
    private UsingAsync: boolean = false;    
    private CurGame: number = 0;
    public MySchedule: iSchedule[];
    public LeagueName: string;
    public HomeTeam: string;
    public AwayTeam: string;
    public HomeScore: number = 0;
    public AwayScore: number = 0;
    public SeasonStart: Date = new Date;
    public CurrentRole: number = 1;

    public constructor(private _soccerService: SoccerService, private _web: WebService) {
        this.LeagueName = "Over 30 men's league";
        this.getSchedule();
        this.SeasonStart.setTime(this.SeasonStart.getTime() + 4 * 86400000);
        if (this.MySchedule.length > 0) {
            this.UpdVariables(0); // Default to first game
            this.CurGame = 1;
        }
    }

    public onSchedChange(GameValue: number) {
        if (GameValue > 0) {
            this.UpdVariables(GameValue);
            this.CurGame = GameValue;
        }
    }
    public onRecordScores() {
        this.MySchedule[this.CurGame - 1].awayScore =
            Number(this.AwayScore);
        this.MySchedule[this.CurGame - 1].homeScore =
            Number(this.HomeScore);
    }

    //private methods
    // Update screen variable based on current game
    private UpdVariables(GameID: number) {
        // Need to search Schedule array, looking for game ID
        var x: number = 0;
        if (GameID > 0) {
            x = GameID - 1;
        }
        this.HomeTeam = this.MySchedule[x].homeTeam;
        this.AwayTeam = this.MySchedule[x].awayTeam;
        this.HomeScore = this.MySchedule[x].homeScore;
        this.AwayScore = this.MySchedule[x].awayScore;
    }
    // Get the schedule (only showing games not yet scored)
    private getSchedule() {
        if (this.UsingAsync) {
            let xx = this._soccerService.getScheduleAsync();
            xx.then((Schedules: iSchedule[]) => this.MySchedule = Schedules
            );
        }
        else {
            this.MySchedule = this._soccerService.getSchedule();
        }
    }
}
