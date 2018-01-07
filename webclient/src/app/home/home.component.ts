import { Component, ElementRef, OnInit } from '@angular/core';

import { Forecast } from '../_models/index';
import { Favorite } from '../_models/index';
import { ForecastService } from '../_services/index';
import { FavoriteService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],

    host: {
        '(document:click)': 'handleClick($event)',
    }
})

export class HomeComponent implements OnInit {
    selectedCity: string;
    favoriteFilter: string;
    forecast: Forecast = new Forecast();
    hasResult = false;
    sendButtonClicked = false;
    imgfolder = '../../../assets/img/';
    favorites: Favorite[] = [];
    filteredFavorites: Favorite[] = [];
    filteredCityList = [];
    selectedCityIdx = -1;
    citiesInFinland = [];

    constructor(private forecastService: ForecastService,
        private favoriteService: FavoriteService,
        private elementRef: ElementRef) { }

    onSelect(city: string): void {
        this.selectedCity = city;
    }

    onSendClick(city: string): void {
        this.selectedCity = city;
        this.forecastService.getForecast(city)
            .subscribe(
                result => {
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
                                    this.favoriteFilter = '';
                                    this.favorites = favoriteResult as Favorite[];
                                    this.filteredFavorites = this.favorites;
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
                  this.filteredFavorites = this.favorites;
                  this.favoriteFilter = '';
                });
    }
    ngOnInit() {
        this.favoriteService.getFavorites()
            .subscribe(
                favoriteResult => {
                  this.favorites = favoriteResult as Favorite[];
                  this.favorites = favoriteResult as Favorite[];
                  this.filteredFavorites = this.favorites;
                  this.favoriteFilter = '';
                });

        this.favoriteService.getCitiesInFinland()
            .subscribe(
                cities => {
                  this.citiesInFinland = cities as string[];
                });
    }

    filterCity(event: any) {
        if (this.selectedCity !== '') {
            this.filteredCityList = this.citiesInFinland.filter(function (el) {
                return el.toLowerCase().indexOf(this.selectedCity.toLowerCase()) > -1;
            }.bind(this));
            if (event.key === 'ArrowDown' && this.selectedCityIdx < this.filteredCityList.length) {
                this.selectedCityIdx++;
            } else if (event.key === 'ArrowUp' && this.selectedCityIdx > 0) {
                this.selectedCityIdx--;
            } else if (event.key === 'Enter') {
                if (this.filteredCityList.length === 0 && this.selectedCity.length !== 0) {
                    this.onSendClick(this.selectedCity);
                } else if (this.selectedCityIdx !== -1){
                    this.selectedCity = this.filteredCityList[this.selectedCityIdx];
                    this.onSendClick(this.selectedCity);
                } else if (this.selectedCity.length !== 0){
                    this.onSendClick(this.selectedCity);
                }
                this.filteredCityList = [];
                this.selectedCityIdx = -1;
            }
        } else {
            this.filteredCityList = [];
        }
    }

    filterFavorite(event: any) {
        if (this.favoriteFilter !== '') {
            this.filteredFavorites = this.favorites.filter(function (el) {
                return el.city.toLowerCase().indexOf(this.favoriteFilter.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredFavorites = this.favorites;
        }
    }

    selectCity(item) {
        this.selectedCity = item;
        this.filteredCityList = [];
        this.selectedCityIdx = -1;
    }

    handleClick(event) {
        let clickedComponent = event.target;
        let inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.filteredCityList = [];
        }
        this.selectedCityIdx = -1;
    }
}
