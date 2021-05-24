import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtGenerationComponent } from './art-generation.component';

describe('ArtGenerationComponent', () => {
  let component: ArtGenerationComponent;
  let fixture: ComponentFixture<ArtGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
