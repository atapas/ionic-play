import { TestBed } from '@angular/core/testing';

import { LineSeparatorService } from './line-separator.service';

describe('LineSeparatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LineSeparatorService = TestBed.get(LineSeparatorService);
    expect(service).toBeTruthy();
  });
});
