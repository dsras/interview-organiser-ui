import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInterviewComponent } from './create-interview.component';

describe('CreateInterviewComponent', () => {
  let component: CreateInterviewComponent;
  let fixture: ComponentFixture<CreateInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
