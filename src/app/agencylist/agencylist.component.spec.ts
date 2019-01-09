import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencylistComponent } from './agencylist.component';

describe('AgencylistComponent', () => {
  let component: AgencylistComponent;
  let fixture: ComponentFixture<AgencylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
