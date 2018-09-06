/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdbannereditComponent } from './adbanneredit.component';

describe('AdbannereditComponent', () => {
  let component: AdbannereditComponent;
  let fixture: ComponentFixture<AdbannereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdbannereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdbannereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
