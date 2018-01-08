package com.jingzhe.favorite;

import static org.junit.Assert.*;
import org.junit.Test;

public class FavoriteTest {

    @Test
    public void testFavorite() {
        Favorite favorite = new Favorite("Finland", "Oulu");
        
        assertEquals(favorite.getCountry(), "Finland");
        assertEquals(favorite.getCity(), "Oulu");
    }
    
}
