import { Injectable } from '@angular/core';
import { User } from '../_model/User';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Data } from '../_model/Data';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserData: Observable<Data>;
  private currentUserSubject: BehaviorSubject<Data>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Data>(
      JSON.parse(localStorage.getItem('currentUserData')));
    this.currentUserData = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Data {
    return this.currentUserSubject.value;
  }

  authUser(login: string, password: string): Observable<Data> {
    return this.http.post(`http://localhost:1337/users/login`, { login, password })
      .pipe(map((data: Data) => {
        if (data) {
          localStorage.setItem('currentUserData', JSON.stringify(data));
          this.currentUserSubject.next(data);
          return data;
        }
      }
      ));

  }

  logout() {
    localStorage.removeItem('currentUserData');
    this.currentUserSubject.next(null);
  }
}

