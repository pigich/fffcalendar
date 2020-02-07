import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../_model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findUserByLogin(login: string): Observable<User> {
    return this.http.get(`http://localhost:3000/users?login=${login}`)
      .pipe(map((user: User) => user[0] ? user[0] : undefined));
  }

}
