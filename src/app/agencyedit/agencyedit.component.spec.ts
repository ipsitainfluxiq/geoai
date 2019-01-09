import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyeditComponent } from './agencyedit.component';

describe('AgencyeditComponent', () => {
  let component: AgencyeditComponent;
  let fixture: ComponentFixture<AgencyeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
