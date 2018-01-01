package com.jingzhe.weatherforecast;

import java.util.ArrayList;
import java.util.List;

public class Forecast {
    private String city = "";
    private String country = "";
    private List<ForecastData> forecasts = new ArrayList<ForecastData>();
    
    public Forecast(String city) {
        this.city = city;
    }
    
    public String getCity() {
        return this.city;
    }

    public String getCountry() {
        return this.country;
    }
    
    public void setCountry(String country) {
        this.country = country;
    }
    
    public List<ForecastData> getForecasts() {
        return this.forecasts;
    }
    
    public void addForecastData(ForecastData data) {
        this.forecasts.add(data);
    }

}
