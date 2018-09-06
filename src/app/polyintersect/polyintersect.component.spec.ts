/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PolyintersectComponent } from './polyintersect.component';

describe('PolyintersectComponent', () => {
  let component: PolyintersectComponent;
  let fixture: ComponentFixture<PolyintersectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolyintersectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolyintersectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
