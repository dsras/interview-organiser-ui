import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionListingComponent } from './position-listing.component';

describe('PositionListingComponent', () => {
  let component: PositionListingComponent;
  let fixture: ComponentFixture<PositionListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
