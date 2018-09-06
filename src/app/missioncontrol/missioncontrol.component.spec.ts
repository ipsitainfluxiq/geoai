/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MissioncontrolComponent } from './missioncontrol.component';

describe('MissioncontrolComponent', () => {
  let component: MissioncontrolComponent;
  let fixture: ComponentFixture<MissioncontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissioncontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissioncontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});