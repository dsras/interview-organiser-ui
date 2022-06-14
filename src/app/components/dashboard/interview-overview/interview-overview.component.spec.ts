import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewOverviewComponent } from './interview-overview.component';

describe('InterviewOverviewComponent', () => {
  let component: InterviewOverviewComponent;
  let fixture: ComponentFixture<InterviewOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
