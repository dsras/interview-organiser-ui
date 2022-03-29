import { TestBed } from '@angular/core/testing';

import { GridConfigService } from './grid-config.service';

describe('GridConfigService', () => {
  let service: GridConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
