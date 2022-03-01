import { TestBed } from '@angular/core/testing';

import { ConsultaCepService } from './consultaCepService';

describe('ConsultaCepService', () => {
  let service: ConsultaCepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaCepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
