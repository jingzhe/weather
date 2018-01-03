package com.jingzhe.weatherforecast;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Formatter;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import java.math.BigDecimal;

import org.springframework.stereotype.Service;

@Service
public class ForecastService {
    
    public Forecast getForecast(String city) {
        Forecast forecast = new Forecast(city);
        try {
            String response = sendGet(city);
            JSONObject json = XML.toJSONObject(response);
            JSONObject weatherData = json.getJSONObject("weatherdata");
            forecast.setCountry(weatherData.getJSONObject("location").getString("country"));
            
            JSONArray timeArray = weatherData.getJSONObject("forecast").getJSONArray("time");
            for(int i = 0, size = timeArray.length() > 20 ? 20 : timeArray.length(); i <  size; ++i) {
                JSONObject time = timeArray.getJSONObject(i);
                String date = time.getString("to");
                int temperature = Math.round(BigDecimal.valueOf(time.getJSONObject("temperature").getDouble("value")).floatValue() - Constants.Kelvin2Celsius);

                ForecastData data = new ForecastData(date, temperature);
                forecast.addForecastData(data);
               
            }

            
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        
        return forecast;
    }
    
    private String sendGet(String city) throws Exception {

        StringBuilder sb = new StringBuilder();
        Formatter fmt = new Formatter(sb);
        fmt.format(Constants.WEATHER_URL, city);
        String url = sb.toString();
        fmt.close();

        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        // optional default is GET
        con.setRequestMethod("GET");

        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + url);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        
        return response.toString();
    }

}
