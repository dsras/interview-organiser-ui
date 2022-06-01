import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedInterviewsComponent } from './completed-interviews.component';

describe('CompletedInterviewsComponent', () => {
  let component: CompletedInterviewsComponent;
  let fixture: ComponentFixture<CompletedInterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedInterviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
