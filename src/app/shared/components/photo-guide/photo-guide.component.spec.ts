import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGuideComponent } from './photo-guide.component';

describe('PhotoGuideComponent', () => {
  let component: PhotoGuideComponent;
  let fixture: ComponentFixture<PhotoGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
