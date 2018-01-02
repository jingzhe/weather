import { Component, OnInit } from '@angular/core';

import { Forecast } from '../_models/index';
import { ForecastService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    selectedCity: string;

    constructor(private forecastService: ForecastService) { }

    onSelect(city: string): void {
        this.selectedCity = city;
    }

    onSendClick(city: string): void {
        this.forecastService.getForecast(city)
            .subscribe(
                result => {
                    console.log(result);
                },
                err => {
                    console.log('Error- something is wrong!');
                });
    }

    ngOnInit() {

    }
}
