import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthLogPage } from './health-log.page';

describe('HealthLogPage', () => {
  let component: HealthLogPage;
  let fixture: ComponentFixture<HealthLogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthLogPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
