import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInformationPage } from './edit-information.page';

describe('EditInformationPage', () => {
  let component: EditInformationPage;
  let fixture: ComponentFixture<EditInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
