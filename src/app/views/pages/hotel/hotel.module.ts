import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AngularMaterialModule } from '../../../material.module';
import { HotelComponent } from './pages/hotel-container/hotel.component';
import { HotelCreateOrderComponent } from './pages/hotel-create-order/hotel-create-order.component';
import { HotelDashboardComponent } from './pages/hotel-dashboard/hotel-dashboard.component';
import { HotelSubheaderComponent } from './pages/hotel-dashboard/hotel-subheader/hotel-subheader.component';
import { HotelOrderStatusComponent } from './pages/hotel-order-status/hotel-order-status.component';
import { HotelOrderComponent } from './pages/hotel-order/hotel-order.component';
import { HotelOrdersComponent } from './pages/hotel-orders/hotel-orders.component';
import { HotelItemComponent } from './partials/hotel-item/hotel-item.component';
import { HotelListComponent } from './partials/hotel-list/hotel-list.component';
import { HotelSearchComponent } from './pages/hotel-search/hotel-search.component';

const secondaryRoutes: Routes = [
  {
    path: '',
    component: HotelComponent,
    children: [
      {
        path: '', component: HotelDashboardComponent
      },
      {
        path: 'Search', component: HotelSearchComponent
      },
      {
        path: 'Booking', component: HotelCreateOrderComponent
      },
      {
        path: 'Orders', component: HotelOrdersComponent
      },
      {
        path: 'Orders/:id', component: HotelOrderComponent
      },
      {
        path: 'Status', component: HotelOrderStatusComponent
      },
      {
        path: 'Status/:id/:chainCode/:surname', component: HotelOrderStatusComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    HotelComponent, HotelDashboardComponent, HotelSubheaderComponent, HotelListComponent, 
    HotelItemComponent, HotelSearchComponent, HotelCreateOrderComponent, 
    HotelOrdersComponent, HotelOrderComponent, HotelOrderStatusComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    RouterModule.forChild(secondaryRoutes)
  ],
  entryComponents: [HotelListComponent],
})
export class HotelModule { }
