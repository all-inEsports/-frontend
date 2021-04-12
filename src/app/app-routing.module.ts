import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
//import { HomeGuard } from './home.guard';
import { GamespageComponent } from './gamespage/gamespage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginComponent } from './login/login.component';
import { MatchpageComponent } from './matchpage/matchpage.component';
import { RegisterComponent } from './register/register.component';
import { NotificationComponent } from './notification/notification.component';
import { TransactionhistoryComponent } from './transactionhistory/transactionhistory.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'leaderboard', component:LeaderboardComponent, canActivate: [AuthGuard]},
  {path:'notifications', component:NotificationComponent, canActivate: [AuthGuard]},
  {path:'register', component: RegisterComponent},
  {path:'history', component:TransactionhistoryComponent, canActivate: [AuthGuard]},
  {path:'home', component: HomepageComponent, canActivate: [AuthGuard]},
  {path:'match/:id', component: MatchpageComponent, canActivate: [AuthGuard]},
  {path:'games/:id', component: GamespageComponent, canActivate: [AuthGuard]},
  {path:'**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
