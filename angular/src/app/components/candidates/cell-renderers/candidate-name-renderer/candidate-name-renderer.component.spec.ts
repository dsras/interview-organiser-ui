import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateNameRendererComponent } from './candidate-name-renderer.component';

describe('CandidateNameRendererComponent', () => {
  let component: CandidateNameRendererComponent;
  let fixture: ComponentFixture<CandidateNameRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateNameRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateNameRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
