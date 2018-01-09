import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('AuthenticationService', () => {
  let injector: Injector;
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });
    
    service = injector.get(AuthenticationService);
    httpMock = injector.get(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
  
  it('Service should be created', () => {
    expect(service).toBeTruthy();
    expect(httpMock).toBeTruthy();
  });

  it(`should issue a request login to authentication service`, async(() => {
      service.login("user", "passwd").subscribe();

      let req = httpMock.expectOne('http://localhost:9999/oauth/token');
      expect(req.request.method).toEqual('POST');
      req.flush([]);
    }));

  it(`should issue a request logout to authentication service, tocken is null`, () => {
      sessionStorage.setItem('currentUser', "test_data");
      service.token = "adfasdfafdafa";
  
      service.logout();
      expect(service.token).toBe(null);
      expect(sessionStorage.getItem("currentUser")).toBe(null);
    });  
});
