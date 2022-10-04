import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { autoSpyObj } from 'angular-unit-test-helper'

import { AuthService } from '../auth/auth.service'
import { UiService } from './ui.service'

describe('UiService', () => {
  let service: UiService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: UiService, useValue: autoSpyObj(UiService) }],
    })
    service = TestBed.inject(UiService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
