import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { Injector } from '@angular/core';
//import { HttpClientModule } from '@angular/common/http';
import { FavoriteService } from './favorite.service';
import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('FavoriteService', () => {
  let injector: Injector;
  let service: FavoriteService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FavoriteService, AuthenticationService]
    });
    
    service = injector.get(FavoriteService);
    httpMock = injector.get(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
  
  it('Service should be created', () => {
    expect(service).toBeTruthy();
    expect(httpMock).toBeTruthy();
  });

  it(`should issue a request getFavorites to favorite service`, async(() => {
      service.getFavorites().subscribe();

      let req = httpMock.expectOne('http://localhost:9091/favorites');
      expect(req.request.method).toEqual('GET');
      req.flush([]);
    }));
  
  it(`should issue a request addFavorite to favorite service`, async(() => {
      service.addFavorite('Finland', 'Oulu').subscribe();

      let req = httpMock.expectOne('http://localhost:9091/add?country=Finland&city=Oulu');
      expect(req.request.method).toEqual('POST');
      req.flush([]);
    }));

  it(`should issue a request removeFavorite to favorite service`, async(() => {
      service.removeFavorite('Oulu').subscribe();

      let req = httpMock.expectOne('http://localhost:9091/remove?city=Oulu');
      expect(req.request.method).toEqual('POST');
      req.flush([]);
    }));

  it(`should issue a request getCitiesInFinland to favorite service`, async(() => {
      service.getCitiesInFinland().subscribe();

      let req = httpMock.expectOne('http://localhost:9091/citiesInFinland');
      expect(req.request.method).toEqual('GET');
      req.flush([]);
    }));
});
