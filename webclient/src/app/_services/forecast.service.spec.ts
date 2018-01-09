import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { ForecastService } from './forecast.service';
import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('ForecastService', () => {
  let injector: Injector;
  let service: ForecastService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ForecastService, AuthenticationService]
    });
    
    service = injector.get(ForecastService);
    httpMock = injector.get(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
  
  it('Service should be created', () => {
    expect(service).toBeTruthy();
    expect(httpMock).toBeTruthy();
  });

  it(`should issue a request getForecast to forecast service`, async(() => {
      service.getForecast("Oulu").subscribe();

      let req = httpMock.expectOne('http://localhost:9090/forecast?city=Oulu');
      expect(req.request.method).toEqual('GET');
      req.flush([]);
    }));
  
});
