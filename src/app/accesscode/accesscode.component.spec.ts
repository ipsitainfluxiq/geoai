/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccesscodeComponent } from './accesscode.component';

describe('AccesscodeComponent', () => {
  let component: AccesscodeComponent;
  let fixture: ComponentFixture<AccesscodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesscodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesscodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
