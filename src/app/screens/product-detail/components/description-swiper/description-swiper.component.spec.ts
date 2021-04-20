import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionSwiperComponent } from './description-swiper.component';

describe('DescriptionSwiperComponent', () => {
  let component: DescriptionSwiperComponent;
  let fixture: ComponentFixture<DescriptionSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
