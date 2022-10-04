import { ComponentFixture, TestBed } from '@angular/core/testing'
import { autoSpyObj } from 'angular-unit-test-helper'
import { AuthService } from 'src/app/auth/auth.service'
import { UiService } from 'src/app/common/ui.service'

import { LogoutComponent } from './logout.component'

describe('LogoutComponent', () => {
  let component: LogoutComponent
  let fixture: ComponentFixture<LogoutComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: UiService, useValue: autoSpyObj(UiService) }],
      declarations: [LogoutComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LogoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
