/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FooternewComponent } from './footernew.component';

describe('FooternewComponent', () => {
  let component: FooternewComponent;
  let fixture: ComponentFixture<FooternewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooternewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooternewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
