import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { CarrentalComponent } from './carrental.component';
import { CarrentalDashboardComponent } from './carrental-dashboard/carrental-dashboard.component';
import { CarrentalSubheaderComponent } from './carrental-dashboard/carrental-subheader/carrental-subheader.component';
import { CarrentalListComponent } from './carrental-search/carrental-list/carrental-list.component';
import { CarrentalViewComponent } from './carrental-view/carrental-view.component';
import { CarrentalItemComponent } from './carrental-search/carrental-list/carrental-item/carrental-item.component';
import { CarrentalSearchComponent } from './carrental-search/carrental-search.component';;
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AngularMaterialModule } from '../../../material.module';
import { CarrentalCreateOrderComponent } from './carrental-create-order/carrental-create-order.component';
import { CarrentalOrdersComponent } from './carrental-orders/carrental-orders.component';
import { CarrentalOrderComponent } from './carrental-order/carrental-order.component';
import { CarrentalOrderStatusComponent } from './carrental-order-status/carrental-order-status.component';

const secondaryRoutes: Routes = [
  {
    path: '',
    component: CarrentalComponent,
    children: [
      {
        path: '', component: CarrentalDashboardComponent
      },
      {
        path: 'Search', component: CarrentalSearchComponent
      },
      {
        path: 'Booking', component: CarrentalCreateOrderComponent
      },
      {
        path: 'Orders', component: CarrentalOrdersComponent
      },
      {
        path: 'Orders/:id', component: CarrentalOrderComponent
      },
      {
        path: 'Status', component: CarrentalOrderStatusComponent
      },
      {
        path: 'Status/:id', component: CarrentalOrderStatusComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    CarrentalComponent, CarrentalDashboardComponent, CarrentalSubheaderComponent, CarrentalListComponent, 
    CarrentalViewComponent, CarrentalItemComponent, CarrentalSearchComponent, CarrentalCreateOrderComponent, 
    CarrentalOrdersComponent, CarrentalOrderComponent, CarrentalOrderStatusComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    RouterModule.forChild(secondaryRoutes)
  ],
  entryComponents: [CarrentalListComponent],
})
export class CarrentalModule { }
