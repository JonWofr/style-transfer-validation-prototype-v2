import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCreationFailure } from './document-creation-failure.component';

describe('DocumentCreationFailureComponent', () => {
  let component: DocumentCreationFailure;
  let fixture: ComponentFixture<DocumentCreationFailure>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentCreationFailure],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCreationFailure);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
