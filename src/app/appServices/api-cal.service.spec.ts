import { TestBed } from '@angular/core/testing';

import { ApiCalService } from './api-cal.service';

describe('ApiCalService', () => {
  let service: ApiCalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
