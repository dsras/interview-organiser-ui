import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDetailsInfoComponent } from './position-details-info.component';

describe('PositionDetailsInfoComponent', () => {
  let component: PositionDetailsInfoComponent;
  let fixture: ComponentFixture<PositionDetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionDetailsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
