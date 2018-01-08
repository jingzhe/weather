package com.jingzhe.weatherforecast;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import java.lang.reflect.*;
import org.json.JSONObject;


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
    
    @Test
    public void testCreateForecastData() {
    	try {
    	Class<?> serviceClass = this.forecastService.getClass();
    	Class<?>[] cArg = new Class[4];
        cArg[0] = JSONObject.class;
        cArg[1] = Integer.class;
        cArg[2] = String.class;
        cArg[3] = String.class;
        
        Object[] argObjects = new Object[4];
        
    	Method method = serviceClass.getDeclaredMethod("createForecastData", cArg);
    	method.setAccessible(true);
    	//method.invoke(this.forecastService, argObjects);
    	}
    	catch(Exception e) {
    		e.printStackTrace();
    	}
    }
}
