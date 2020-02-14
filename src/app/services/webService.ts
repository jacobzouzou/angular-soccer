import { Injectable, RootRenderer } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { SoccerService } from './soccerService';
import { iTeam } from '../interfaces/teams';
import { Observable } from 'rxjs';
import { InMemoryDbService } from 'angular-in-memory-web-api';

const queryOptions={
  headers: new  HttpHeaders(
    {
      'Access-Control-Allow-Origin':'*',
      responseType:'json'
     })
  }
@Injectable({
  providedIn:"root"
})
export class WebService implements InMemoryDbService {
  private _IPURL: string = "http://ip.jsontest.com";
  private teamsUrl: string = "../../assets/teams.json";

  //api 
  public teamsApiUrl="api/teams";

  constructor(private _http: HttpClient, private _soccer: SoccerService) {
  }

    //in memory db
    createDb() {
        let teams=        [
            { id: 1, name: "Old Menu United", type: "Over 30" },
            { id: 2, name: "422 Nomads", type: "Over 30" },
            { id: 3, name: "FC Dauntless", type: "Over 30" },
            { id: 4, name: "Kellie's Kickers", type: "Over 30" },
            { id: 5, name: "Blue Devils", type: "Over 30" },
            { id: 6, name: "Torn Achilles", type: "Over 30" }
        ]
        return { teams};
    }

  public getIP() {
    return this._http.get(this._IPURL);
  }
  public callURL(_URL: string) {
    return this._http.get(_URL);
  }
  public getTeams(): Observable<iTeam[]> {
    let teams = this._soccer.getTeams();
    return this._http.get<iTeam[]>(this.teamsUrl,queryOptions);
  }
  public getTeamsFromApi():Observable<iTeam[]> {
    return this._http.get<iTeam[]>(this.teamsApiUrl, queryOptions);
   }
}