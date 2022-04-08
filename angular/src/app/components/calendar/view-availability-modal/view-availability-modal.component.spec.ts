import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAvailabilityModalComponent } from './view-availability-modal.component';

describe('ViewAvailabilityModalComponent', () => {
  let component: ViewAvailabilityModalComponent;
  let fixture: ComponentFixture<ViewAvailabilityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAvailabilityModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAvailabilityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
