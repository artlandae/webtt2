import { TestBed } from '@angular/core/testing';

import { VentanaModalService } from './ventana-modal.service';

describe('VentanaModalService', () => {
  let service: VentanaModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentanaModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
