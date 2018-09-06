/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WalletlistComponent } from './walletlist.component';

describe('WalletlistComponent', () => {
  let component: WalletlistComponent;
  let fixture: ComponentFixture<WalletlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
