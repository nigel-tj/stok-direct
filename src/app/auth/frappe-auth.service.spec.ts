import { TestBed } from '@angular/core/testing';

import { FrappeAuthService } from './frappe-auth.service';

describe('FrappeAuthService', () => {
  let service: FrappeAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrappeAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
