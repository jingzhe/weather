package com.jingzhe.weatherforecast;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Formatter;

import org.json.JSONArray;
import org.json.JSONException;
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
            //System.out.println(weatherData.toString());
            forecast.setCountry(weatherData.getJSONObject("location").getString("country"));
            int longitude = (int) weatherData.getJSONObject("location").getJSONObject("location").getDouble("longitude");
            String sunRiseDate = weatherData.getJSONObject("sun").getString("rise");
            String sunSetDate = weatherData.getJSONObject("sun").getString("set");
            
            JSONArray timeJsonArray = weatherData.getJSONObject("forecast").getJSONArray("time");
            for(int i = 0, size = timeJsonArray.length(); i <  size; ++i) {
                JSONObject timeJson = timeJsonArray.getJSONObject(i);
                if (i < 12 || (i >= 12 && i % 4 == 0)) {
                    forecast.addForecastData(createForecastData(timeJson, longitude, sunRiseDate, sunSetDate));
                }
            }
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        
        return forecast;
    }
    
    private ForecastData createForecastData(JSONObject timeJson, int longitude, 
            String sunRiseDate, String sunSetDate) throws JSONException, ParseException {
        String date = timeJson.getString("to");
        int temperature = Math.round(BigDecimal.valueOf(timeJson.getJSONObject("temperature").getDouble("value"))
                .floatValue() - Constants.Kelvin2Celsius);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        Date utcDate = formatter.parse(date);
        Date sunRise = formatter.parse(sunRiseDate);
        Date sunSet = formatter.parse(sunSetDate);

        Date localDate = new Date(utcDate.getTime() + (longitude / 15 +1) * 3600000); // use longitude to calculate local time
        Date localRiseDate = new Date(sunRise.getTime() + (longitude / 15 +1) * 3600000); 
        Date localSetDate = new Date(sunSet.getTime() + (longitude / 15 +1) * 3600000); 
        boolean day = isDayTime(localDate, localRiseDate, localSetDate);
        
        Calendar cal = Calendar.getInstance();
        cal.setTime(localDate);
        
        DateFormat timeFormat = new SimpleDateFormat("HH:mm");
        String localTime = timeFormat.format(localDate);
        
        DateFormat dayFormat = new SimpleDateFormat("EEE");
        String weekDay = dayFormat.format(localDate);
        
        String iconName = day ? "sun_cloud" : "night_cloud";
        try {
            JSONObject precJson = timeJson.getJSONObject("precipitation");
            if (precJson.has("value")) {
                double precValue = precJson.getDouble("value");
                if (precJson.getString("type").equals("snow") && precValue > 5) {
                    iconName = "snow";
                }
                else if (precJson.getString("type").equals("snow") 
                        && precJson.getDouble("value") <= 5) {
                    iconName = "light_snow";
                }
                else if (precJson.getString("type").equals("rain") && precValue > 5) {
                    iconName = "rain";
                }
                else if (precJson.getString("type").equals("rain") 
                        && precJson.getDouble("value") <= 5) {
                    iconName = "light_rain";
                }
            }
            else {
                int cloud = timeJson.getJSONObject("clouds").getInt("all");
                if (cloud < 10) {
                    iconName = day ? "sun" : "night";
                }
                else if (cloud > 80) {
                    iconName = "cloud";
                }
            }
        }
        catch(Exception e) {
            //System.out.println("Use default icon sun/night_cloud");
        }
        
        ForecastData data = new ForecastData(weekDay, localTime, iconName + ".png", temperature);
        
        return data;
    }
    
    private String sendGet(String city) throws Exception {

        StringBuilder sb = new StringBuilder();
        Formatter fmt = new Formatter(sb);
        fmt.format(Constants.WEATHER_URL, city);
        String url = sb.toString();
        fmt.close();

        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

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
    
    @SuppressWarnings("deprecation")
    private boolean isDayTime(Date date, Date sunRise, Date sunSet) {
        int mine = date.getHours() * 60 + date.getMinutes();
        int rise = sunRise.getHours() * 60 + sunRise.getMinutes();
        int set = sunSet.getHours() * 60 + sunSet.getMinutes();
        
        return mine > rise && mine < set;
    }

}
