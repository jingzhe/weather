
Weather forecast architecture

weather
├── authserver: Authentication server, http://localhost:9999
├── favorite: Favorite microservice, http://localhost:9091
├── readme.md: this readme file
├── screenshot.png: a screenshot for presentation
├── weatherforecast: Weather forecast microservice, http://localhost:9090
└── webclient: Angular webclient, http://localhost:4200

Brief explanation:

- Authentication server: Using OAuth2 and JWT to authenticate all RESTful API calls to microservices, with fixed username and password.
- Favorite microservice: Provide user's favorite cities, support read, add and remove functions
- Weatherforecast microservices: Provide weather data for given city, I use free weather service from http://api.openweathermap.org, get 5 days and 3 hours weather data.
- Webclient is made from Angular 5.

How to run

I tested in Linuxmint 18 with chrome browser.
my versions:
node: 8.9.4
npm: 5.6.0
java: 1.8.0

- Open 4 shell windows
- Start autentication server: cd weather/authserver && mvn spring-boot:run
- Start favorite service: cd weather/favorite && mvn spring-boot:run
- Start weatherforecast service: cd weather/weatherforecast && mvn spring-boot:run
- Start Webclient: cd weather/webclient && sudo npm install -g @angular/cli (only for the first time) && npm install && ng serve
- Open your chrome browser, go to http://localhost:4200 (username: user, password: user123)

How to run unit test

- cd weather/favorite && mvn clean test
- cd weather/weatherforecast && mvn clean test
- cd weather/webclient && ng test

To be improved

- I calculated local time of searched city by UTC time and longitude, might not be accuate for big country with only 1 timezone, such as China.
- Auto-complete is supported when search the city for weather data, currently only cities in Finland are supported for auto-complete because of performance issues.
- I calculated the weather type by my own weather expertise, not all weather types are supported (only support cloudy, light_rain, light_snow, clear_night, night_cloud, rain, snow, sun, sun_cloud)
- Unit test could be improved with more mocking code

I attach a screenshot for presentation.