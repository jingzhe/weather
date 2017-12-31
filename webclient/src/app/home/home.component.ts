import { Component, OnInit } from '@angular/core';

import { Forecast } from '../_models/index';
import { ForecastService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    forecast: Forecast;

    constructor(private forecastService: ForecastService) { }

    ngOnInit() {
        // get users from secure api end point
        this.forecastService.getForecast()
            .subscribe(forecast => {
                this.forecast = forecast;
            });
    }

}