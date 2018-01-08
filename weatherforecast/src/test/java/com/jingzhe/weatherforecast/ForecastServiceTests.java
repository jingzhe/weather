package com.jingzhe.weatherforecast;

import static org.junit.Assert.assertEquals;

import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ForecastServiceTests {

	@Autowired
	private ForecastService forecastService;
	
    @Test
    public void testAddFavorite() {
        Forecast forecast = forecastService.getForecast("Oulu");
        assertEquals(forecast.getCity(), "Oulu");
        assertEquals(forecast.getCountry(), "FI");
        assertEquals(forecast.getForecasts().size(), 19);
    }
}
