import { TestBed } from '@angular/core/testing';

import { MatSheetService } from './mat-sheet.service';

describe('MatSheetService', () => {
  let service: MatSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
