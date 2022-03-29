import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappedCandidatesComponent } from './mapped-candidates.component';

describe('MappedCandidatesComponent', () => {
  let component: MappedCandidatesComponent;
  let fixture: ComponentFixture<MappedCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappedCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MappedCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
