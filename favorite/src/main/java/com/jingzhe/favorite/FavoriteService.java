package com.jingzhe.favorite;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

@Service
public class FavoriteService {
    
    private List<Favorite> favorites = new ArrayList<Favorite>();
    
    public List<Favorite> getFavorites() {
        return this.favorites;
    }
    
    public List<String> getCitiesInFinland() {
        Resource resource = new ClassPathResource("finland.json");
        String content = "";
        List<String> cities = new ArrayList<String>();
        try {
            content = new String(FileCopyUtils.copyToByteArray(resource.getInputStream()));
            JSONArray jsonArray = new JSONArray(content);
            cities = IntStream.range(0,jsonArray.length()).mapToObj(i->{
                try {
                    return jsonArray.getString(i);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                return "";
            }).collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cities;
    }
    
    public void addFavorite(Favorite favorite) {
        this.favorites.add(favorite);
    }
    
    public void removeFavorite(String city) {
        this.favorites.removeIf((Favorite item) -> item.getCity().equals(city));
    }

}
