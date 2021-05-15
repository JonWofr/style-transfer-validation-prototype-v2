import { TestBed } from '@angular/core/testing';

import { CollectionConverterService } from './collection-converter.service';

describe('CollectionConverterService', () => {
  let service: CollectionConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
