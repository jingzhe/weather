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
    forecast: Forecast = new Forecast();
    hasResult = false;
    sendButtonClicked = false;
    imgfolder = '../../../assets/img/';
    favorites: Favorite[] = [];
    filteredList = [];
    selectedIdx = -1;
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

        this.favoriteService.getCitiesInFinland()
            .subscribe(
                cities => {
                  this.citiesInFinland = cities as string[];
                });
    }

    filter(event: any) {
        console.log(event);
        if (this.selectedCity !== '') {
            this.filteredList = this.citiesInFinland.filter(function (el) {
                return el.toLowerCase().indexOf(this.selectedCity.toLowerCase()) > -1;
            }.bind(this));
            if (event.key === 'ArrowDown' && this.selectedIdx < this.filteredList.length) {
                this.selectedIdx++;
            } else if (event.key === 'ArrowUp' && this.selectedIdx > 0) {
                this.selectedIdx--;
            } else if (event.key === 'Enter') {
                if (this.filteredList.length === 0 && this.selectedCity.length !== 0) {
                    this.onSendClick(this.selectedCity);
                } else if (this.selectedIdx !== -1){
                    this.selectedCity = this.filteredList[this.selectedIdx];
                    this.onSendClick(this.selectedCity);
                } else if (this.selectedCity.length !== 0){
                    this.onSendClick(this.selectedCity);
                }
                this.filteredList = [];
                this.selectedIdx = -1;
            }
        } else {
            this.filteredList = [];
        }
    }

    select(item) {
        this.selectedCity = item;
        this.filteredList = [];
        this.selectedIdx = -1;
    }

    handleClick(event) {
        console.log(event);
        let clickedComponent = event.target;
        let inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.filteredList = [];
        }
        this.selectedIdx = -1;
    }
}
