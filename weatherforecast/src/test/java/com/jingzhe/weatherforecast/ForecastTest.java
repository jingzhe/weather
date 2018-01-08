package com.jingzhe.weatherforecast;

import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class ForecastTest {

    @Test
    public void testFavorite() {
        Forecast forecast = new Forecast("Oulu");
        forecast.setCountry("Finland");
        ForecastData forecastData = new ForecastData("Mon", "2018-01-08-21:14:00",
                "sun.png", -10);
        forecast.addForecastData(forecastData);
        
        assertEquals(forecast.getCountry(), "Finland");
        assertEquals(forecast.getCity(), "Oulu");
        
        ForecastData dataInList = forecast.getForecasts().get(0);
        assertEquals(dataInList.getIconName(), forecastData.getIconName());
        assertEquals(dataInList.getLocalTime(), forecastData.getLocalTime());
        assertEquals(dataInList.getTemperature(), forecastData.getTemperature());
        
    }
}
