import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { GolfComponent } from './golf.component';
import { GolfDashboardComponent } from './golf-dashboard/golf-dashboard.component';
import { GolfSubheaderComponent } from './golf-dashboard/golf-subheader/golf-subheader.component';
import { GolfListComponent } from './golf-search/golf-list/golf-list.component';
import { GolfViewComponent } from './golf-view/golf-view.component';
import { GolfItemComponent } from './golf-search/golf-list/golf-item/golf-item.component';
import { GolfSearchComponent } from './golf-search/golf-search.component';;
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AngularMaterialModule } from '../../../material.module';
import { GolfCreateOrderComponent } from './golf-create-order/golf-create-order.component';
import { GolfOrdersComponent } from './golf-orders/golf-orders.component';
import { GolfOrderComponent } from './golf-order/golf-order.component';
import { GolfOrderStatusComponent } from './golf-order-status/golf-order-status.component';

const secondaryRoutes: Routes = [
  {
    path: '',
    component: GolfComponent,
    children: [
      {
        path: '', component: GolfDashboardComponent
      },
      {
        path: 'Search', component: GolfSearchComponent
      },
      {
        path: 'Booking', component: GolfCreateOrderComponent
      },
      {
        path: 'Orders', component: GolfOrdersComponent
      },
      {
        path: 'Orders/:id', component: GolfOrderComponent
      },
      {
        path: 'Status', component: GolfOrderStatusComponent
      },
      {
        path: 'Status/:id', component: GolfOrderStatusComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    GolfComponent, GolfDashboardComponent, GolfSubheaderComponent, GolfListComponent, 
    GolfViewComponent, GolfItemComponent, GolfSearchComponent, GolfCreateOrderComponent, 
    GolfOrdersComponent, GolfOrderComponent, GolfOrderStatusComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    RouterModule.forChild(secondaryRoutes)
  ],
  entryComponents: [GolfListComponent],
})
export class GolfModule { }
