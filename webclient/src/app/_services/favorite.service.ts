import { AuthenticationService } from './authentication.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FavoriteService {
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }

    getFavorites(): Observable<Object> {
        // add authorization header with jwt token
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.token});

        return this.http.get('http://localhost:9091/favorites', {headers: headers});
    }

    addFavorite(country, city): Observable<Object> {
        // add authorization header with jwt token
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.token});

        return this.http.post('http://localhost:9091/add?country=' + country + '&city=' + city, '',
            {headers: headers});
    }

    removeFavorite(city): Observable<Object> {
        // add authorization header with jwt token
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.token});

        return this.http.post('http://localhost:9091/remove?city=' + city, '',
            {headers: headers});
    }

}
