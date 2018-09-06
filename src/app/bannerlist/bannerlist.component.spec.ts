/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BannerlistComponent } from './bannerlist.component';

describe('BannerlistComponent', () => {
  let component: BannerlistComponent;
  let fixture: ComponentFixture<BannerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
