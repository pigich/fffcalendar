import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/_model/User';
import { AuthenticationService } from '../shared/service/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  title = 'auth';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }
  ngOnInit() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
