import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseData } from '../_model/BaseData';
import { BaseApi } from './base-api';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseApi {
  public currentUserData: Observable<BaseData>;
  private currentUserSubject: BehaviorSubject<BaseData>;

  constructor(public http: HttpClient) {
    super(http);
    this.currentUserSubject = new BehaviorSubject<BaseData>(
      JSON.parse(localStorage.getItem('currentUserData')));
    this.currentUserData = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): BaseData {
    return this.currentUserSubject.value;
  }

  authUser(login: string, password: string): Observable<BaseData> {
    return this.post('login', { login, password })
      .pipe(map((data: BaseData) => {
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

