package com.jingzhe.weatherforecast;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebController {
    
    @Autowired
    private ForecastService forecastService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/forecast")
    public Forecast readForecast(@RequestParam("city") String city) {
        Forecast forecast = forecastService.getForecast(city);
        return forecast;
    }
}
