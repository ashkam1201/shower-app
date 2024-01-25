import { TestBed } from '@angular/core/testing';

import { ShowerReportService } from './shower-report.service';

describe('ShowerReportService', () => {
  let service: ShowerReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowerReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
