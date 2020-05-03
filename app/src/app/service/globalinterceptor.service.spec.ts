import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalinterceptorService } from './globalinterceptor.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GlobalinterceptorService', () => {
  let service: GlobalinterceptorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
    });
    service = TestBed.inject(GlobalinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
