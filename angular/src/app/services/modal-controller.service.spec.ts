import { TestBed } from '@angular/core/testing';

import { ModalControllerService } from './modal-controller.service';

describe('ModalControllerService', () => {
  let service: ModalControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
