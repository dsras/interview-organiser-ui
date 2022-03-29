import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateStatusFormatterComponent } from './candidate-status-formatter.component';

describe('CandidateStatusFormatterComponent', () => {
  let component: CandidateStatusFormatterComponent;
  let fixture: ComponentFixture<CandidateStatusFormatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateStatusFormatterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateStatusFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
