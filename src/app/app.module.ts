import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './screens/home/components/hero/hero.component';
import { StyleSelectionComponent } from './screens/style-selection/style-selection.component';
import { ProductDetailComponent } from './screens/product-detail/product-detail.component';
import { SummaryComponent } from './screens/summary/summary.component';
import { DescriptionSwiperComponent } from './screens/product-detail/components/description-swiper/description-swiper.component';
import { HowItWorksComponent } from './screens/home/components/how-it-works/how-it-works.component';
import { HomeComponent } from './screens/home/home.component';
import { RouterStateService } from './shared/services/router-state/router-state.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    StyleSelectionComponent,
    ProductDetailComponent,
    SummaryComponent,
    DescriptionSwiperComponent,
    HowItWorksComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [RouterStateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
