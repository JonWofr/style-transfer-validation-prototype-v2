import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtworkPreviewComponent } from './screens/artwork-preview/artwork-preview.component';
import { DocumentCreationFailure } from './screens/document-creation-failure/document-creation-failure.component';
import { DocumentCreationSuccess } from './screens/document-creation-success/document-creation-success.component';
import { HomeComponent } from './screens/home/home.component';
import { ImageUploadComponent } from './screens/image-upload/image-upload.component';
import { StyleSelectionComponent } from './screens/style-selection/style-selection.component';
import { SummaryComponent } from './screens/summary/summary.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'styles-selection',
    component: StyleSelectionComponent,
  },
  {
    path: 'image-upload',
    component: ImageUploadComponent,
  },
  {
    path: 'summary',
    component: SummaryComponent,
  },
  {
    path: 'success',
    component: DocumentCreationSuccess,
  },
  {
    path: 'failure',
    component: DocumentCreationFailure,
  },
  {
    path: 'artwork-preview',
    component: ArtworkPreviewComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
