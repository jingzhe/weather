import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: HttpClient) {
        // set token if saved in session storage
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    // return value: 0 - ok, 1 - bad credential, 2 - other error
    login(username: string, password: string): Observable<number> {
        const headers = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + btoa('web_app:web_secret')
            });

        const data = 'username=' + username + '&password=' + password + '&grant_type=password' +
            '&client_id=web_app&client_secret=web_secret';

        return this.http.post('http://localhost:9999/oauth/token', data, { headers: headers })
            .map((response: HttpResponse<any>) => {
                // login successful if there's a jwt token in the response
                const token = response['access_token'];
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in session storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return 0 to indicate successful login
                    return 0;
                } else {
                    // return 1 to indicate failed login
                    return 1;
                }
            }).catch((errorResponse: HttpErrorResponse) => {
                if (errorResponse.error.error === 'invalid_grant') {
                    return Observable.of(1);
                }
                return Observable.of(2);
            });
    }

    logout(): void {
        // clear token remove user from session storage to log user out
        this.token = null;
        sessionStorage.removeItem('currentUser');
    }
}
