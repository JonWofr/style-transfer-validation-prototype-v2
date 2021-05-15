import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MugPreviewComponent } from './mug-preview.component';

describe('MugPreviewComponent', () => {
  let component: MugPreviewComponent;
  let fixture: ComponentFixture<MugPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MugPreviewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MugPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
