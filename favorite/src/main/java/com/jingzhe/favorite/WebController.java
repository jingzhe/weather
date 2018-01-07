package com.jingzhe.favorite;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class WebController {

    @Autowired
    private FavoriteService favoriteService;
    
    @GetMapping("/favorites")
    public List<Favorite> getFavorites() {
        return this.favoriteService.getFavorites();
    }
    
    @GetMapping("/citiesInFinland")
    public List<String> getCities() {
        return this.favoriteService.getCitiesInFinland();
    }

    @PreAuthorize("hasAuthority('WRITE')")
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public List<Favorite> addFavorite(@RequestParam("country") String country, @RequestParam("city") String city) {
        boolean cityExists = this.favoriteService.getFavorites().stream()
                .anyMatch(item -> item.getCity().equals(city));
        
        if (!cityExists) {
            Favorite favorite = new Favorite(country, city);
            this.favoriteService.addFavorite(favorite);
        }
        
        return this.favoriteService.getFavorites();
    }
    
    @PreAuthorize("hasAuthority('WRITE')")
    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    public List<Favorite> removeFavorite(@RequestParam("city") String city) {
        this.favoriteService.removeFavorite(city);
        
        return this.favoriteService.getFavorites();
    }
}
