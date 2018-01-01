import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class ForecastService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getForecast(city): Observable<Response> {
        // add authorization header with jwt token
        const headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.authenticationService.token });
        console.log('token=');
        console.log(this.authenticationService.token);
        const myParams = new URLSearchParams();
        myParams.set('city', city);
        const options = new RequestOptions({ headers: headers, params: myParams });
        const response = this.http.get('http://localhost:9090/forecast', options);
        return response;
    }
}
