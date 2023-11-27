import { TestBed } from '@angular/core/testing';

import { ApinombresService } from './apinombres.service';

describe('ApinombresService', () => {
  let service: ApinombresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApinombresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
