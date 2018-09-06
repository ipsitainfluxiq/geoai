/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CicrlemapComponent } from './cicrlemap.component';

describe('CicrlemapComponent', () => {
  let component: CicrlemapComponent;
  let fixture: ComponentFixture<CicrlemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CicrlemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CicrlemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
