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
   public IP: string; 
   public md5:string; 
   public Teams:iTeam[];

   public ErrMsg:string;
   
   public _MD5URL:string="http://md5.jsontest.com?text=";

    constructor( private _titleService:Title, private _webService:WebService) {
        this._webService=_webService;
        this._titleService.setTitle("web service");
        this.getIpAddress();
        this.getMD5("AngularRocks");
        this.getTeams();
    }

    public getIpAddress(){
        let observableResult= this._webService.getIP();
        observableResult.subscribe((data:string)=>{
            this.IP=data['ip'];
        }); 
    }
    public getMD5( str: string) {
        let finalUrl = this._MD5URL + encodeURI(str);
        this._webService.callURL(finalUrl).subscribe( (data:string[]) => this.md5= data["md5"]);
    }       
    public getTeams(){
        this._webService.getTeams().subscribe((data:iTeam[])=>{
            this.Teams= data;
        },
        Error => this.ErrMsg = Error.message);
    }
}
