import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { TransportationComponent } from './transportation.component';
import { TransportationDashboardComponent } from './transportation-dashboard/transportation-dashboard.component';
import { TransportationSubheaderComponent } from './transportation-dashboard/transportation-subheader/transportation-subheader.component';
import { TransportationListComponent } from './transportation-search/transportation-list/transportation-list.component';
import { TransportationViewComponent } from './transportation-view/transportation-view.component';
import { TransportationItemComponent } from './transportation-search/transportation-list/transportation-item/transportation-item.component';
import { TransportationSearchComponent } from './transportation-search/transportation-search.component';;
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AngularMaterialModule } from '../../../material.module';
import { TransportationCreateOrderComponent } from './transportation-create-order/transportation-create-order.component';
import { TransportationOrdersComponent } from './transportation-orders/transportation-orders.component';
import { TransportationOrderComponent } from './transportation-order/transportation-order.component';
import { TransportationOrderStatusComponent } from './transportation-order-status/transportation-order-status.component';

const secondaryRoutes: Routes = [
  {
    path: '',
    component: TransportationComponent,
    children: [
      {
        path: '', component: TransportationDashboardComponent
      },
      {
        path: 'Search', component: TransportationSearchComponent
      },
      {
        path: 'Booking', component: TransportationCreateOrderComponent
      },
      {
        path: 'Orders', component: TransportationOrdersComponent
      },
      {
        path: 'Orders/:id', component: TransportationOrderComponent
      },
      {
        path: 'Status', component: TransportationOrderStatusComponent
      },
      {
        path: 'Status/:id', component: TransportationOrderStatusComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    TransportationComponent, TransportationDashboardComponent, TransportationSubheaderComponent, TransportationListComponent, 
    TransportationViewComponent, TransportationItemComponent, TransportationSearchComponent, TransportationCreateOrderComponent, 
    TransportationOrdersComponent, TransportationOrderComponent, TransportationOrderStatusComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    RouterModule.forChild(secondaryRoutes)
  ],
  entryComponents: [TransportationListComponent],
})
export class TransportationModule { }
