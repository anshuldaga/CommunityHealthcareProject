import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthEducationPage } from './health-education.page';

describe('HealthEducationPage', () => {
  let component: HealthEducationPage;
  let fixture: ComponentFixture<HealthEducationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthEducationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthEducationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
