import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppScoring} from './app.scoring';
import {AppStandings} from './app.standings';
import {AppAdmin} from './app.admin';
import { AppPageNotFound } from './app.pageNotFound';



const routes: Routes = [
  {path:'', redirectTo:'/Standings', pathMatch: 'full' } ,//default root
  {path:"Standings", component:AppStandings},
  {path:"Admin", component:AppAdmin},
  {path:"Scoring", component:AppScoring},
  {path:"**", component:AppPageNotFound},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
