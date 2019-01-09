import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceeditextraComponent } from './audienceeditextra.component';

describe('AudienceeditextraComponent', () => {
  let component: AudienceeditextraComponent;
  let fixture: ComponentFixture<AudienceeditextraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudienceeditextraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudienceeditextraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
