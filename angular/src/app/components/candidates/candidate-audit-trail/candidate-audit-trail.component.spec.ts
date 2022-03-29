import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAuditTrailComponent } from './candidate-audit-trail.component';

describe('CandidateAuditTrailComponent', () => {
  let component: CandidateAuditTrailComponent;
  let fixture: ComponentFixture<CandidateAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateAuditTrailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
