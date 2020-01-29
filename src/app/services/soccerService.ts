import {Injectable, RootRenderer} from '@angular/core';
import {SEASON_SCHEDULE, TEAMS} from './schedule-data';


@Injectable({
    providedIn:"root"
})
export class SoccerService  {

    //other service methods
    public getScheduleAsync() : any {
        return Promise.resolve(SEASON_SCHEDULE);
    }
    public getSchedule() : any {
        return SEASON_SCHEDULE;
    }
    public getTeamsAsync() : any {
        return Promise.resolve(TEAMS);
    }
    public getTeams() : any {
        return TEAMS;
    }
}
