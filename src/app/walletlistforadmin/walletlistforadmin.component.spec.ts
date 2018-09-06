/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WalletlistforadminComponent } from './walletlistforadmin.component';

describe('WalletlistforadminComponent', () => {
  let component: WalletlistforadminComponent;
  let fixture: ComponentFixture<WalletlistforadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletlistforadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletlistforadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
