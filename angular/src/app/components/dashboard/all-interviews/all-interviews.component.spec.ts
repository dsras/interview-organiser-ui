import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInterviewsComponent } from './all-interviews.component';

describe('AllInterviewsComponent', () => {
  let component: AllInterviewsComponent;
  let fixture: ComponentFixture<AllInterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInterviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
