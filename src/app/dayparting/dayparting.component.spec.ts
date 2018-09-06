/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DaypartingComponent } from './dayparting.component';

describe('DaypartingComponent', () => {
  let component: DaypartingComponent;
  let fixture: ComponentFixture<DaypartingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaypartingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaypartingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
