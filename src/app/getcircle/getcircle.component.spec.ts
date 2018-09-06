/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GetcircleComponent } from './getcircle.component';

describe('GetcircleComponent', () => {
  let component: GetcircleComponent;
  let fixture: ComponentFixture<GetcircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetcircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetcircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
