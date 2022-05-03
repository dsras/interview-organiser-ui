import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAvailabilityComponent } from './view-availability.component';

describe('ViewAvailabilityModalComponent', () => {
  let component: ViewAvailabilityComponent;
  let fixture: ComponentFixture<ViewAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAvailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
