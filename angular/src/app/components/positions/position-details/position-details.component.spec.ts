import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDetailsComponent } from './position-details.component';

describe('PositionDetailsComponent', () => {
  let component: PositionDetailsComponent;
  let fixture: ComponentFixture<PositionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
