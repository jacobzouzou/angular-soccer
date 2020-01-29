import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {WebService} from './services/webService'; 
import { iTeam } from './interfaces/teams';

import teams from '../assets/teams.json';


@Component({
    templateUrl:'./views/admin.html',
    providers: [Title, WebService]
})
export class AppAdmin{
   private _service:WebService;
   public IP: string; 
   public md5:string; 
   public Teams:iTeam[];

   public ErrMsg:string;
   
   public _MD5URL:string="http://md5.jsontest.com?text=";

    constructor(
        private _titleService:Title, 
        private _web:WebService) {
        this._service=_web;
        this._titleService.setTitle("web service");
        this.getIpAddress();
        this.getMD5("AngularRocks");
        this.getTeams();
    }

    public getIpAddress(){
        let observableResult= this._web.getIP();
        observableResult.subscribe((data:string)=>{
            this.IP=data['ip'];
        }); 
    }
    public getMD5( str: string) {
        let finalUrl = this._MD5URL + encodeURI(str);
        this._web.CallURL(finalUrl).subscribe( (data:string[]) => this.md5= data["md5"]);
    }       
    public getTeams(){
        // //Get local data
        this._web.getTeams().subscribe((data:iTeam[])=>{
            this.Teams= data;
        },
        Error => this.ErrMsg = Error.message);

        // //get data from api
        // this._web.getTeamsFromApi().subscribe((data:iTeam[])=>{
        //     this.Teams= data;
        // },
        // Error => this.ErrMsg = Error.message);
    }
    public getTeamsBis(){
        this.Teams= teams;
    }
}
