import { TestBed } from '@angular/core/testing';

import { DummyDatabaseService } from './dummy-database.service';

describe('DummyDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DummyDatabaseService = TestBed.get(DummyDatabaseService);
    expect(service).toBeTruthy();
  });
});
