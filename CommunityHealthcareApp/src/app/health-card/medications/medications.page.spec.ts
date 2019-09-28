import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationsPage } from './medications.page';

describe('MedicationsPage', () => {
  let component: MedicationsPage;
  let fixture: ComponentFixture<MedicationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
