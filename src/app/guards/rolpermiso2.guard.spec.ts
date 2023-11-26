import { TestBed } from '@angular/core/testing';

import { Rolpermiso2Guard } from './rolpermiso2.guard';

describe('Rolpermiso2Guard', () => {
  let guard: Rolpermiso2Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Rolpermiso2Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
