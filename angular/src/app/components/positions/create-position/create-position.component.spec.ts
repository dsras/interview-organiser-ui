import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePositionComponent } from './create-position.component';

describe('CreatePositionComponent', () => {
  let component: CreatePositionComponent;
  let fixture: ComponentFixture<CreatePositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
