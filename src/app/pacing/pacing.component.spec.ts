/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PacingComponent } from './pacing.component';

describe('PacingComponent', () => {
  let component: PacingComponent;
  let fixture: ComponentFixture<PacingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
