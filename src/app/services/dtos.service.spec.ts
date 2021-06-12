import { TestBed } from '@angular/core/testing';

import { DTOsService } from './dtos.service';

describe('DTOsService', () => {
  let service: DTOsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DTOsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
