import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './index';
import { Forecast } from '../_models/index';

@Injectable()
export class ForecastService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getForecast(): Observable<Forecast> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get('localhost:9090/foo', options)
            .map((response: Response) => response.json());
    }
}