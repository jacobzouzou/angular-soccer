import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { iTeam } from './interfaces/teams';
import { iRanking } from './interfaces/ranking';
import { iSchedule } from './interfaces/schedule';

import { SoccerService } from './services/soccerService';
import { WebService } from './services/webService'

@Component({
    templateUrl: './views/standings.html',    // HTML template name 
    // Set styles for template 
    styles: [` 
              h3 {
                text-align:center;
                color:navy;
                font-size:xlarge;
                margin:0px;
              } 
              table { 
                width:92%;
                margin:1em auto;
                font-size:large; 
                font-family:"Comic Sans MS", cursive, sans-serif; 
              }  
              th { 
                text-decoration:underline;
              } 
                ` ],
    providers: [Title, SoccerService, WebService]
})
export class AppStandings {
    public UsingAsync: boolean=true;
    public IPAddr: string;

    public LeagueName: string;

    public MyTeams: iTeam[];
    public MySchedule: iSchedule[];
    public Standings: iRanking[];
    /**
     *
     */
    constructor(
        private _titleService: Title, 
        private _soccerService: SoccerService,
        private _web: WebService) {

        this._titleService.setTitle("422 Soccer");
        this.LeagueName = "Over 30 men's league";
        this.getTeams();
        this.getSchedule();
    }
    private getTeams() {
        if (this.UsingAsync) {
            let xx=this._soccerService.getTeamsAsync();
            xx.then((teams) => {
                this.MyTeams = teams;
            })
        }
        else {
            this.MyTeams = this._soccerService.getTeams();
        }
    }
    private getSchedule() {
        if (this.UsingAsync) {
           let xx= this._soccerService.getScheduleAsync()
            xx.then((schedules) => {
                this.ComputeRankings(schedules);
            })
        }
        else {
            this.MySchedule = this._soccerService.getSchedule();
            this.ComputeRankings();

        }
    }
    public getIPAddress(){
        this._web.getIP().subscribe( (data:string) => this.IPAddr = data["ip"] );
    }
    private ComputeRankings(schedules=null) {
        var curDate: Date = new Date();
        var TeamAt: number;
        this.Standings = []; // Empty the array 
        if(schedules!=null) {
            this.MySchedule=schedules;
        }
        this.MySchedule.forEach(element => {
            if (element.playingDate < curDate && element.homeScore >= 0) {
                TeamAt = this.FindTeam(element.homeTeam);
                if (TeamAt < 0) {
                    this.Standings.push(
                        {
                            teamName: element.homeTeam,
                            gamesPlayed: 0, wins: 0, ties: 0,
                            goalsFor: 0, goalsAgainst: 0
                        })
                    TeamAt = this.Standings.length - 1;
                }
                this.UpdCurrentRow(element, TeamAt, "H");
                TeamAt = this.FindTeam(element.awayTeam);
                if (TeamAt < 0) {
                    this.Standings.push(
                        {
                            teamName: element.awayTeam,
                            gamesPlayed: 0, wins: 0, ties: 0,
                            goalsFor: 0, goalsAgainst: 0
                        })
                    TeamAt = this.Standings.length - 1;
                }
                this.UpdCurrentRow(element, TeamAt, "A");
            }
        });
        this.Standings.sort((left, right): number => {
            if (left.wins * 3 + left.ties < right.wins * 3 + right.ties) return 1;
            if (left.wins * 3 + left.ties > right.wins * 3 + right.ties) return -1;
            // Else, then are tied, typically we'd add addition logic to break Ties 
            if (left.goalsFor < right.goalsFor) return 1;
            if (left.goalsFor > right.goalsFor) return -1;

            // Finally, return zero if still tied. 
            return 0;
        });
    };
    private UpdCurrentRow(element: iSchedule, TeamAt: number, HomeAway: string) {
        this.Standings[TeamAt].gamesPlayed++;
        if (HomeAway == "H") {
            this.Standings[TeamAt].goalsFor += element.homeScore;
            this.Standings[TeamAt].goalsAgainst += element.awayScore;
            // Win 
            if (element.homeScore > element.awayScore) {
                this.Standings[TeamAt].wins++;
            }
        }
        if (HomeAway == "A") {
        this.Standings[TeamAt].goalsFor += element.awayScore;
            this.Standings[TeamAt].goalsAgainst += element.homeScore;
            if (element.awayScore > element.homeScore) {
                this.Standings[TeamAt].wins++;
            }
        }
        if (element.homeScore == element.awayScore) {
            this.Standings[TeamAt].ties++;
        }
    }
    // Find the team or -1 
    private FindTeam(TeamName:string) : number { 
        var FoundAt: number = -1; 
        for (var _x=0;_x < this.Standings.length;_x++) 
        { 
             if (this.Standings[_x].teamName==TeamName) { 
               return _x; 
             } 
        } 
        return FoundAt; 
      }
}
