import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { DocumentCreationSuccess } from './screens/document-creation-success/document-creation-success.component';
import { DocumentCreationFailure } from './screens/document-creation-failure/document-creation-failure.component';
import {
  AngularFireAnalyticsModule,
  COLLECTION_ENABLED,
  // DEBUG_MODE,
  ScreenTrackingService,
} from '@angular/fire/analytics';

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
    DocumentCreationSuccess,
    DocumentCreationFailure,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SwiperModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAnalyticsModule,
  ],
  providers: [
    RouterStateService,
    // Does automatically integrate into the angular router. Once a route is called a screen_view event is fired.
    // Note: Additionally AngularFireAnalyticsModule does per default fire a single page_view event when the user first fetches the SPA.
    ScreenTrackingService,
    // Is used to prevent events being fired in development mode which would pollute anayltics data.
    // Note: This value is only read and applied the first time a user visits the website.
    // In order to apply the current value one must delete all browser data and refresh the website or use the designated function setAnalyticsCollectionEnabled.
    { provide: COLLECTION_ENABLED, useValue: environment.production },
    // When debug mode is enabled one can see the events in real time in the debug view in the firebase console.
    // Note: Events fired in debug mode are still included in all other reports, even though debug mode is set as a parameter.
    // Therefore debug mode and collection in general should only be turned on in development when it is absolutely necessary.
    // Note: Alternatively debug mode can be enabled by turning on the Google Chrome extension Google Analytics Debugger.
    // Then the extension serves as a proxy and appends the debug_mode property to all events so that they appear in the debug view.
    // { provide: DEBUG_MODE, useValue: !environment.production },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
