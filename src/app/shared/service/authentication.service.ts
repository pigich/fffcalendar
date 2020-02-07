import { Injectable } from '@angular/core';
import { User } from '../_model/User';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, find } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUser: Observable<User>;
  public test: Observable<any> = of(1, 2, 3);
  private currentUserSubject: BehaviorSubject<User>;
  dataList: any[] = [];

  constructor(private http: HttpClient, private userService: UserService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // FIXME this method will be replaced with 'post' and to real backend server
  authUser(login: string, password: string): Observable<User> {
    // this.currentUser = this.http.get(`http://localhost:3000/users?login=${login}&password=${password}`)
    return this.http.get(`http://localhost:3000/users?login=${login}&password=${password}`)
      .pipe(map((user: User) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user[0]));
          this.currentUserSubject.next(user);
          return user;
          // } else {
          // this.currentUser = new Observable<User>(observer => {
          //   observer.error('test error');
          // });
          // return this.currentUser;
          // throw new Error('No value, no function...');
        }
      }
      ));
    // if (localStorage.getItem('currentUser')) {
    //   this.currentUser = new Observable<User>(observer => {
    //     observer.error('test error');
    //   });
    //   return this.currentUser;
    // }
    // return this.currentUser;
    // if (localStorage.getItem('currentUser')) {
    //   this.currentUser = new Observable<User>(observer => {
    //     observer.error('test error');
    //   });
    //   return this.currentUser;
    // }
    // return this.currentUser;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

