import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDetailsHeaderComponent } from './position-details-header.component';

describe('PositionDetailsHeaderComponent', () => {
  let component: PositionDetailsHeaderComponent;
  let fixture: ComponentFixture<PositionDetailsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionDetailsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
