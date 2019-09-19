import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthResourcesPage } from './health-resources.page';

describe('HealthResourcesPage', () => {
  let component: HealthResourcesPage;
  let fixture: ComponentFixture<HealthResourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthResourcesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthResourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
