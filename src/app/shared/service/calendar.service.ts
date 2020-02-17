import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserTask } from '../_model/UserTask';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  // findAllUserEvents(id: string): Observable<UserTask> {
  //   return this.http.get(`http://localhost:1337/events?_id=${id}`)
  //     .pipe(map((event: UserTask) => event[0] ? event[0] : undefined));
  // }

}
