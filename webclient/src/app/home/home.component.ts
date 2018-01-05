import { Component, OnInit } from '@angular/core';

import { Forecast } from '../_models/index';
import { Favorite } from '../_models/index';
import { ForecastService } from '../_services/index';
import { FavoriteService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    selectedCity: string;
    forecast: Forecast = new Forecast();
    hasResult = false;
    sendButtonClicked = false;
    imgfolder = '../../../assets/img/';
    favorites: Favorite[] = [];



    constructor(private forecastService: ForecastService, private favoriteService: FavoriteService) { }

    onSelect(city: string): void {
        this.selectedCity = city;
    }

    onSendClick(city: string): void {
        this.selectedCity = city;
        this.forecastService.getForecast(city)
            .subscribe(
                result => {
                    console.log(result);
                  this.sendButtonClicked = true;
                    if (result['forecasts'].length === 0) {
                        this.hasResult = false;
                        this.forecast.city = result['city'];
                    }
                    else {
                        this.hasResult = true;
                        this.forecast.city = result['city'];
                        this.forecast.country = result['country'];
                        this.forecast.items = result['forecasts'];
                        this.favoriteService.addFavorite(this.forecast.country, this.forecast.city)
                            .subscribe(
                                favoriteResult => {
                                  this.favorites = favoriteResult as Favorite[];
                                });
                    }
                },
                err => {
                    console.log('Error- something is wrong!');
                });
    }

    onRemoveClick(city: string): void {
        this.favoriteService.removeFavorite(city)
            .subscribe(
                favoriteResult => {
                  this.favorites = favoriteResult as Favorite[];
                });
    }
    ngOnInit() {
        this.favoriteService.getFavorites()
            .subscribe(
                favoriteResult => {
                  this.favorites = favoriteResult as Favorite[];
                });
    }
}
