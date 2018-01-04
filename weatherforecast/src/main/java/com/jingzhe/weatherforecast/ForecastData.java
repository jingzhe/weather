package com.jingzhe.weatherforecast;

public class ForecastData {
    private String weekDay;
    private String localTime;
    private int temperature;
    private String iconName;
    
    public ForecastData(String weekDay, String localTime, String iconName, int temperature) {

        this.weekDay = weekDay;
        this.localTime = localTime;
        this.iconName = iconName;
        this.temperature = temperature;
    }
    
    public String getWeekDay() {
        return this.weekDay;
    }
    
    public String getLocalTime() {
        return this.localTime;
    }
   
    public int getTemperature() {
        return this.temperature;
    }
    
    public String getIconName()
    {
        return this.iconName;
    }
    
}
