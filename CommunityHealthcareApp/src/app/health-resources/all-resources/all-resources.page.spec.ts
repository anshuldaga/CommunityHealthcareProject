import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllResourcesPage } from './all-resources.page';

describe('AllResourcesPage', () => {
  let component: AllResourcesPage;
  let fixture: ComponentFixture<AllResourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllResourcesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllResourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
