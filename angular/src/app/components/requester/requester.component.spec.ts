import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterComponent } from './requester.component';

describe('RequesterComponent', () => {
  let component: RequesterComponent;
  let fixture: ComponentFixture<RequesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
