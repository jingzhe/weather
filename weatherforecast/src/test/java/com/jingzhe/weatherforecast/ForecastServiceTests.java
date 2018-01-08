package com.jingzhe.weatherforecast;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;
import java.lang.reflect.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.json.JSONObject;


@RunWith(SpringRunner.class)
@SpringBootTest
public class ForecastServiceTests {

	@Autowired
	private ForecastService forecastService;
	
    @Test
    public void testGetForecast() {
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
            cArg[1] = int.class;
            cArg[2] = String.class;
            cArg[3] = String.class;
            
            String jsonStr = "{'symbol':{'number':800,'var':'01n','name':'clear sky'},'precipitation':'','temperature':{'unit':'kelvin','min':267.45,'max':268.172,'value':267.45},'humidity':{'unit':'%','value':82},'from':'2018-01-08T15:00:00','to':'2018-01-08T18:00:00','windDirection':{'code':'WNW','deg':283,'name':'West-northwest'},'pressure':{'unit':'hPa','value':1028.49},'clouds':{'all':0,'unit':'%','value':'clear sky'},'windSpeed':{'mps':4.96,'name':'Gentle Breeze'}}";
            JSONObject json = new JSONObject(jsonStr);
    
            
            Object[] argObjects = new Object[4];
            argObjects[0] = json;
            argObjects[1] = (Integer)25;
            argObjects[2] = "2018-01-08T08:11:48";
            argObjects[3] = "2018-01-08T12:38:44";
            
        	Method method = serviceClass.getDeclaredMethod("createForecastData", cArg);
        	method.setAccessible(true);
        	ForecastData myData = (ForecastData) method.invoke(this.forecastService, argObjects);
        	assertEquals(myData.getWeekDay(), "Mon");
        	assertEquals(myData.getIconName(), "night_cloud.png");
        	assertEquals(myData.getLocalTime(), "20:00");
        	assertEquals(myData.getTemperature(), -6);
    	}
    	catch(Exception e) {
    		e.printStackTrace();
    	}
    }
    
    @Test
    public void testIsDayTime() {
        try {
            Class<?> serviceClass = this.forecastService.getClass();
            Class<?>[] cArg = new Class[3];
            cArg[0] = Date.class;
            cArg[1] = Date.class;
            cArg[2] = Date.class;
            
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd-HH:mm:ss");
            String curDateStr = "2018-01-08-20:45:00";
            String sunRiseDateStr = "2018-01-07-09:50:00";
            String sunSetDateStr = "2018-01-07-15:20:00";
            
            Object[] argObjects = new Object[3];
            argObjects[0] = formatter.parse(curDateStr);
            argObjects[1] = formatter.parse(sunRiseDateStr);
            argObjects[2] = formatter.parse(sunSetDateStr);
            Method method = serviceClass.getDeclaredMethod("isDayTime", cArg);
            method.setAccessible(true);
            boolean isDay = (boolean) method.invoke(this.forecastService, argObjects);
            assertFalse(isDay);
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }

}
