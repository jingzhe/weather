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

    login(username: string, password: string): Observable<boolean> {
        const headers = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + btoa('web_app:web_secret')
            });

        const data = 'username=' + username + '&password=' + password + '&grant_type=password' +
            '&client_id=web_app&client_secret=web_secret';

        return this.http.post('http://localhost:9999/oauth/token', data, { headers: headers })
            .catch((error: any) => Observable.of(false))
            .map((response: HttpResponse<any>) => {
                console.log(response);
                // login successful if there's a jwt token in the response
                const token = response['access_token'];
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in session storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from session storage to log user out
        this.token = null;
        sessionStorage.removeItem('currentUser');
    }
}
