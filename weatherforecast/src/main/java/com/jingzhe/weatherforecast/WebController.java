package com.jingzhe.weatherforecast;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebController {
    
    @Autowired
    private ForecastService forecastService;

    @RequestMapping(method = RequestMethod.GET, value = "/forecast")
    public Forecast readForecast(@RequestParam("city") String city) {
        Forecast forecast = forecastService.getForecast(city);
        return forecast;
    }


}
