import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { RailComponent } from './rail.component';
import { RailDashboardComponent } from './rail-dashboard/rail-dashboard.component';
import { RailSubheaderComponent } from './rail-dashboard/rail-subheader/rail-subheader.component';
import { RailListComponent } from './rail-search/rail-list/rail-list.component';
import { RailViewComponent } from './rail-view/rail-view.component';
import { RailItemComponent } from './rail-search/rail-list/rail-item/rail-item.component';
import { RailSearchComponent } from './rail-search/rail-search.component';;
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AngularMaterialModule } from '../../../material.module';
import { RailCreateOrderComponent } from './rail-create-order/rail-create-order.component';
import { RailOrdersComponent } from './rail-orders/rail-orders.component';
import { RailOrderComponent } from './rail-order/rail-order.component';
import { RailOrderStatusComponent } from './rail-order-status/rail-order-status.component';

const secondaryRoutes: Routes = [
  {
    path: '',
    component: RailComponent,
    children: [
      {
        path: '', component: RailDashboardComponent
      },
      {
        path: 'Search', component: RailSearchComponent
      },
      {
        path: 'Booking', component: RailCreateOrderComponent
      },
      {
        path: 'Orders', component: RailOrdersComponent
      },
      {
        path: 'Orders/:id', component: RailOrderComponent
      },
      {
        path: 'Status', component: RailOrderStatusComponent
      },
      {
        path: 'Status/:id', component: RailOrderStatusComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    RailComponent, RailDashboardComponent, RailSubheaderComponent, RailListComponent, 
    RailViewComponent, RailItemComponent, RailSearchComponent, RailCreateOrderComponent, 
    RailOrdersComponent, RailOrderComponent, RailOrderStatusComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    RouterModule.forChild(secondaryRoutes)
  ],
  entryComponents: [RailListComponent],
})
export class RailModule { }
