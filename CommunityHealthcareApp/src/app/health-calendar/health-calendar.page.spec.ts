import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCalendarPage } from './health-calendar.page';

describe('HealthCalendarPage', () => {
  let component: HealthCalendarPage;
  let fixture: ComponentFixture<HealthCalendarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthCalendarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
