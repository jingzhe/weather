import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './index';
import { Forecast } from '../_models/index';

@Injectable()
export class ForecastService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getForecast(city): Observable<Response> {
        // add authorization header with jwt token
        const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        const options = new RequestOptions({ headers: headers });
        const response = this.http.get('localhost:9090/forecast?city=' + city, options);
        return response;
    }
}
