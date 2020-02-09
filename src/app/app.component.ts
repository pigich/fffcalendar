import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './shared/_model/User';
import { AuthenticationService } from './shared/service/authentication.service';
import { Data } from './shared/_model/Data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // currentUser: User;
  currentUserData: Data;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUserData.subscribe(data => this.currentUserData = data);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
