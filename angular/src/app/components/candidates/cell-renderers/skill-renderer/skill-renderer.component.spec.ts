import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillRendererComponent } from './skill-renderer.component';

describe('SkillRendererComponent', () => {
  let component: SkillRendererComponent;
  let fixture: ComponentFixture<SkillRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
