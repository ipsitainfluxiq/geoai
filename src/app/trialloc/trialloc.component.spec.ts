/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TriallocComponent } from './trialloc.component';

describe('TriallocComponent', () => {
  let component: TriallocComponent;
  let fixture: ComponentFixture<TriallocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriallocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriallocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
