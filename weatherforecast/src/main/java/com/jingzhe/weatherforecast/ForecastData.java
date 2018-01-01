package com.jingzhe.weatherforecast;

public class ForecastData {
    private String date;
    private int temperature;
    
    public ForecastData(String date, int temperature) {
        this.date = date;
        this.temperature = temperature;
    }
    
    public String getDate() {
        return this.date;
    }
   
    public int getTemperature() {
        return this.temperature;
    }
}
