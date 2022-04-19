import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindInterviewComponent } from './find-interview.component';

describe('CreateInterviewComponent', () => {
  let component: FindInterviewComponent;
  let fixture: ComponentFixture<FindInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
