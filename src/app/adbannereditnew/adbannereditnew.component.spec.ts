/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdbannereditnewComponent } from './adbannereditnew.component';

describe('AdbannereditnewComponent', () => {
  let component: AdbannereditnewComponent;
  let fixture: ComponentFixture<AdbannereditnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdbannereditnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdbannereditnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
