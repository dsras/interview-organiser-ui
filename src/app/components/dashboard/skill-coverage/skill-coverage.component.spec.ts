import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCoverageComponent } from './skill-coverage.component';

describe('SkillCoverageComponent', () => {
  let component: SkillCoverageComponent;
  let fixture: ComponentFixture<SkillCoverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillCoverageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
