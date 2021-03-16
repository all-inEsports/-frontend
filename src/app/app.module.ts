import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// COMPONENT IMPORTS
import { LoginComponent } from './login/login.component';
import { InterceptTokenService } from './intercept-token.service';

// ANGULAR MATERIAL IMPORTS
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BackgroundVideoComponent } from './background-video/background-video.component';
import { RegisterComponent } from './register/register.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'; 
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatchpageComponent } from './matchpage/matchpage.component';
import { PasswordPatternDirective } from './directives/password-pattern.directive';
import { PasswordMatchDirective } from './directives/password-match.directive';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GamespageComponent } from './gamespage/gamespage.component';
import { ExploregamesComponent } from './exploregames/exploregames.component';
import { ActivematchesComponent } from './activematches/activematches.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BackgroundVideoComponent,
    RegisterComponent,
    LeaderboardComponent,
    HomepageComponent,
    MatchpageComponent,
    PasswordPatternDirective,
    PasswordMatchDirective,
    UserProfileComponent,
    GamespageComponent,
    ExploregamesComponent,
    ActivematchesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptTokenService,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
