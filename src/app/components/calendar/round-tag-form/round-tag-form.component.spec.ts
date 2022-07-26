import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTagFormComponent } from './round-tag-form.component';

describe('RoundTagFormComponent', () => {
  let component: RoundTagFormComponent;
  let fixture: ComponentFixture<RoundTagFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundTagFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundTagFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
