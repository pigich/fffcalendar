import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BaseApi {
    private BASE_URL = 'http://localhost:1337/';

    constructor(public http: HttpClient) {
    }

    private getUrl(url: string = '') {
        return this.BASE_URL + url;
    }

    public get(url: string = ''): Observable<any> {
        return this.http.get(this.getUrl(url));
    }

    public post(url: string = '', data: any = {}): Observable<any> {
        return this.http.post(this.getUrl(url), data);
    }

    public put(url: string = '', data: any = {}): Observable<any> {
        return this.http.put(this.getUrl(url), data);
    }

    public delete(url: string = ''): Observable<any> {
        return this.http.delete(this.getUrl(url));
    }
}
