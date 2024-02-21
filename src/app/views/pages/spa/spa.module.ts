import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { SpaComponent } from './spa.component';
import { SpaDashboardComponent } from './spa-dashboard/spa-dashboard.component';
import { SpaSubheaderComponent } from './spa-dashboard/spa-subheader/spa-subheader.component';
import { SpaListComponent } from './spa-search/spa-list/spa-list.component';
import { SpaViewComponent } from './spa-view/spa-view.component';
import { SpaItemComponent } from './spa-search/spa-list/spa-item/spa-item.component';
import { SpaSearchComponent } from './spa-search/spa-search.component';;
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AngularMaterialModule } from '../../../material.module';
import { SpaCreateOrderComponent } from './spa-create-order/spa-create-order.component';
import { SpaOrdersComponent } from './spa-orders/spa-orders.component';
import { SpaOrderComponent } from './spa-order/spa-order.component';
import { SpaOrderStatusComponent } from './spa-order-status/spa-order-status.component';

const secondaryRoutes: Routes = [
  {
    path: '',
    component: SpaComponent,
    children: [
      {
        path: '', component: SpaDashboardComponent
      },
      {
        path: 'Search', component: SpaSearchComponent
      },
      {
        path: 'Booking', component: SpaCreateOrderComponent
      },
      {
        path: 'Orders', component: SpaOrdersComponent
      },
      {
        path: 'Orders/:id', component: SpaOrderComponent
      },
      {
        path: 'Status', component: SpaOrderStatusComponent
      },
      {
        path: 'Status/:id', component: SpaOrderStatusComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    SpaComponent, SpaDashboardComponent, SpaSubheaderComponent, SpaListComponent, 
    SpaViewComponent, SpaItemComponent, SpaSearchComponent, SpaCreateOrderComponent, 
    SpaOrdersComponent, SpaOrderComponent, SpaOrderStatusComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    RouterModule.forChild(secondaryRoutes)
  ],
  entryComponents: [SpaListComponent],
})
export class SpaModule { }
