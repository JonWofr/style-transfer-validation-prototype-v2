import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCreationSuccess } from './document-creation-success.component';

describe('DocumentCreationSuccessComponent', () => {
  let component: DocumentCreationSuccess;
  let fixture: ComponentFixture<DocumentCreationSuccess>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentCreationSuccess],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCreationSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
