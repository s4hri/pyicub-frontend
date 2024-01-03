import { TestBed } from '@angular/core/testing';

import { AsyncRequestManagerService } from './async-request-manager.service';

describe('AsyncRequestManagerService', () => {
  let service: AsyncRequestManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsyncRequestManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
