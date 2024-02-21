import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { CruiseComponent } from './cruise.component';
import { CruiseDashboardComponent } from './cruise-dashboard/cruise-dashboard.component';
import { CruiseSubheaderComponent } from './cruise-dashboard/cruise-subheader/cruise-subheader.component';
import { CruiseListComponent } from './cruise-search/cruise-list/cruise-list.component';
import { CruiseViewComponent } from './cruise-view/cruise-view.component';
import { CruiseItemComponent } from './cruise-search/cruise-list/cruise-item/cruise-item.component';
import { CruiseSearchComponent } from './cruise-search/cruise-search.component';;
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AngularMaterialModule } from '../../../material.module';
import { CruiseCreateOrderComponent } from './cruise-create-order/cruise-create-order.component';
import { CruiseOrdersComponent } from './cruise-orders/cruise-orders.component';
import { CruiseOrderComponent } from './cruise-order/cruise-order.component';
import { CruiseOrderStatusComponent } from './cruise-order-status/cruise-order-status.component';

const secondaryRoutes: Routes = [
  {
    path: '',
    component: CruiseComponent,
    children: [
      {
        path: '', component: CruiseDashboardComponent
      },
      {
        path: 'Search', component: CruiseSearchComponent
      },
      {
        path: 'Booking', component: CruiseCreateOrderComponent
      },
      {
        path: 'Orders', component: CruiseOrdersComponent
      },
      {
        path: 'Orders/:id', component: CruiseOrderComponent
      },
      {
        path: 'Status', component: CruiseOrderStatusComponent
      },
      {
        path: 'Status/:id', component: CruiseOrderStatusComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    CruiseComponent, CruiseDashboardComponent, CruiseSubheaderComponent, CruiseListComponent, 
    CruiseViewComponent, CruiseItemComponent, CruiseSearchComponent, CruiseCreateOrderComponent, 
    CruiseOrdersComponent, CruiseOrderComponent, CruiseOrderStatusComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    RouterModule.forChild(secondaryRoutes)
  ],
  entryComponents: [CruiseListComponent],
})
export class CruiseModule { }
