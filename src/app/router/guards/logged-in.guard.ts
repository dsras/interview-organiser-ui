import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GetUserDataService } from 'src/app/services/get-user-data.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: GetUserDataService
  ) {}
  canActivate(): boolean {
    let allowed = false;
    if (this.userService.getUserData()) {
      this.router.navigate(['calendar']);
    } else {
      allowed = true;
    }
    return allowed;
  }
}
