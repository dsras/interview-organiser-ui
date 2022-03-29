import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappedCandidateEditComponent } from './mapped-candidate-edit.component';

describe('MappedCandidateEditComponent', () => {
  let component: MappedCandidateEditComponent;
  let fixture: ComponentFixture<MappedCandidateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappedCandidateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MappedCandidateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
