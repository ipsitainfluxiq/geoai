/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllwalletlistComponent } from './allwalletlist.component';

describe('AllwalletlistComponent', () => {
  let component: AllwalletlistComponent;
  let fixture: ComponentFixture<AllwalletlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllwalletlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllwalletlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
