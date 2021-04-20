import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './core/components/hero/hero.component';
import { StyleSelectionComponent } from './core/components/style-selection/style-selection.component';
import { ProductDetailComponent } from './core/components/product-detail/product-detail.component';
import { SummaryComponent } from './core/components/summary/summary.component';
import { DescriptionSwiperComponent } from './core/components/description-swiper/description-swiper.component';
import { HowItWorksComponent } from './core/components/how-it-works/how-it-works.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    StyleSelectionComponent,
    ProductDetailComponent,
    SummaryComponent,
    DescriptionSwiperComponent,
    HowItWorksComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SwiperModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
