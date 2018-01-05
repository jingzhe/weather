package com.jingzhe.favorite;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class FavoriteService {
    
    private List<Favorite> favorites = new ArrayList<Favorite>();
    
    public List<Favorite> getFavorites() {
        return this.favorites;
    }
    
    public void addFavorite(Favorite favorite) {
        this.favorites.add(favorite);
    }
    
    public void removeFavorite(String city) {
        this.favorites.removeIf((Favorite item) -> item.getCity().equals(city));
    }

}
