import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/service/authentication.service';
import { Data } from '../shared/_model/Data';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
 public currentUserData: Data;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUserData.subscribe(data => this.currentUserData = data);
  }
  ngOnInit() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
