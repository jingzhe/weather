import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class ForecastService {
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }

    getForecast(city): Observable<Object> {
        // add authorization header with jwt token
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.token});

        return this.http.get('http://localhost:9090/forecast?city=' + city, {headers: headers});
    }
}
