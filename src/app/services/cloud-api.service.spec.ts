import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

import { CloudApiService } from './cloud-api.service';

describe('CloudApiService', () => {
  let injector: TestBed;
  let service: CloudApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CloudApiService ]
    });

    injector = getTestBed();
    service = injector.get(CloudApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('generateImage()', () => {
    const requestPayload = {
      theme: 'default',
      channel: 'linkedin',
      keywords: [
        {
          text: 'foobar',
          weight: 1
        }
      ]
    };

    const response = {
      image: 'fooobarbase64string'
    };

    service.generateImage(requestPayload).subscribe(
      img => {
        expect(img).toEqual('fooobarbase64string');
      }
    );

    const req = httpMock.expectOne(`${environment.cloudApiURL}/generate`);
    expect(req.request.method).toEqual('POST');

    req.flush(response);
  });
});
