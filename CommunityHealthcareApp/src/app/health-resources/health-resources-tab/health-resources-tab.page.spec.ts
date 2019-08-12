import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthResourcesTabPage } from './health-resources-tab.page';

describe('HealthResourcesTabPage', () => {
  let component: HealthResourcesTabPage;
  let fixture: ComponentFixture<HealthResourcesTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthResourcesTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthResourcesTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
