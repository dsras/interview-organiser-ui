import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateEditRendererComponent } from './candidate-edit-renderer.component';

describe('CandidateEditRendererComponent', () => {
  let component: CandidateEditRendererComponent;
  let fixture: ComponentFixture<CandidateEditRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateEditRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateEditRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
