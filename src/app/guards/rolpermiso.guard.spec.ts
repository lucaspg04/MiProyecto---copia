import { TestBed } from '@angular/core/testing';

import { RolpermisoGuard } from './rolpermiso.guard';

describe('RolpermisoGuard', () => {
  let guard: RolpermisoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolpermisoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
