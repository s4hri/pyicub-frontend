import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { applicationSelectedGuard } from './application-selected.guard';

describe('applicationSelectedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => applicationSelectedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
