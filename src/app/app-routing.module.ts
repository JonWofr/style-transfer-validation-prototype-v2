import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { ProductDetailComponent } from './screens/product-detail/product-detail.component';
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
    path: 'product-detail',
    component: ProductDetailComponent,
  },
  {
    path: 'summary',
    component: SummaryComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
