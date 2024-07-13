import { TestBed } from '@angular/core/testing';

import { EMasterService } from './e-master.service';

describe('EMasterService', () => {
  let service: EMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
