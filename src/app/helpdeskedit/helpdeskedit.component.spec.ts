import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdeskeditComponent } from './helpdeskedit.component';

describe('HelpdeskeditComponent', () => {
  let component: HelpdeskeditComponent;
  let fixture: ComponentFixture<HelpdeskeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpdeskeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpdeskeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
