import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamespageComponent } from './gamespage/gamespage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginComponent } from './login/login.component';
import { MatchpageComponent } from './matchpage/matchpage.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'leaderboard', component:LeaderboardComponent},
  {path:'register', component: RegisterComponent},
  {path:'home', component: HomepageComponent},
  {path:'match/:id', component: MatchpageComponent},
  {path:'games/:id', component: GamespageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
