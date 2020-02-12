import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/service/authentication.service';
import { BaseData } from '../shared/_model/BaseData';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
 public currentUserData: BaseData;

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
