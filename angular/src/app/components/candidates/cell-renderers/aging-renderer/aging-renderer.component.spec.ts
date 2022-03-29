import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgingRendererComponent } from './aging-renderer.component';

describe('AgingRendererComponent', () => {
  let component: AgingRendererComponent;
  let fixture: ComponentFixture<AgingRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgingRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgingRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
