/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdbanneraddComponent } from './adbanneradd.component';

describe('AdbanneraddComponent', () => {
  let component: AdbanneraddComponent;
  let fixture: ComponentFixture<AdbanneraddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdbanneraddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdbanneraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
