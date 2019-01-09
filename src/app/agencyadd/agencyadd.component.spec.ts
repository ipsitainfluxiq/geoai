import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyaddComponent } from './agencyadd.component';

describe('AgencyaddComponent', () => {
  let component: AgencyaddComponent;
  let fixture: ComponentFixture<AgencyaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
