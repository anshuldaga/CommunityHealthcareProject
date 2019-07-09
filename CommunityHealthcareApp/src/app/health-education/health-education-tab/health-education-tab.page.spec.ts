import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthEducationTabPage } from './health-education-tab.page';

describe('HealthEducationTabPage', () => {
  let component: HealthEducationTabPage;
  let fixture: ComponentFixture<HealthEducationTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthEducationTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthEducationTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
