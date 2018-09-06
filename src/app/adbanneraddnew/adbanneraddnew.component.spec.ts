/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdbanneraddnewComponent } from './adbanneraddnew.component';

describe('AdbanneraddnewComponent', () => {
  let component: AdbanneraddnewComponent;
  let fixture: ComponentFixture<AdbanneraddnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdbanneraddnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdbanneraddnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
