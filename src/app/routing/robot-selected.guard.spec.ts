import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { robotSelectedGuard } from './robot-selected.guard';

describe('robotSelectedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => robotSelectedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
