package com.jingzhe.favorite;

public class Favorite {
    private String country;
    private String city;
    
    public Favorite(String country, String city) {
        this.country = country;
        this.city = city;
    }
    
    public String getCountry() {
        return this.country;
    }
    
    public String getCity() {
        return this.city;
    }

}
