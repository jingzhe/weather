package com.jingzhe.favorite;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FavoriteServiceTest {
    @Autowired
    private FavoriteService favoriteService;
    
    @Test
    public void testAddFavorite() {
        Favorite favorite = new Favorite("Finland", "Oulu");
        favoriteService.addFavorite(favorite);
        
        List<Favorite> list = favoriteService.getFavorites();
        assertEquals(list.size(), 1);
        assertTrue(list.contains(favorite));
    }
    
    @Test
    public void testRemoveFavorite() {
        Favorite favorite = new Favorite("Finland", "Oulu");
        favoriteService.addFavorite(favorite);
        
        List<Favorite> list = favoriteService.getFavorites();
        assertEquals(list.size(), 1);
        
        favoriteService.removeFavorite("Oulu");
        assertEquals(list.size(), 0);
    }
    
    @Test
    public void testGetCitiesInFinland() {
        List<String> cities = favoriteService.getCitiesInFinland();
        assertTrue(cities.size() > 100);
        assertTrue(cities.contains("Oulu"));
        
    }
}
