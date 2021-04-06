import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private rt: Router){

  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.rt.navigate(['/']);
      return false;
    }
    return true;
  }
  
}
