import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { AirlineDashboardComponent } from './pages/airline-dashboard/airline-dashboard.component';
import { AirlineSearchComponent } from './pages/airline-search/airline-search.component';;
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AngularMaterialModule } from '../../../material.module';
import { AirlineCreateOrderComponent } from './pages/airline-create-order/airline-create-order.component';
import { AirlineOrdersComponent } from './pages/airline-orders/airline-orders.component';
import { AirlineOrderComponent } from './pages/airline-order/airline-order.component';
import { AirlinePaymentComponent } from './pages/airline-payment/airline-payment.component';
import { AirlineSeatAvailabilityComponent } from './partials/airline-seat-availability/airline-seat-availability.component';
import { AirlineFlightItemComponent } from './partials/airline-flight-item/airline-flight-item.component';
import { AirlineComponent } from './pages/airline-container/airline.component';
import { AirlineOrderSummaryComponent } from './partials/airline-order-summary/airline-order-summary.component';
import { AirlinePassengerFormComponent } from './partials/airline-passenger-form/airline-passenger-form.component';
import { AirlinePassengerListComponent } from './partials/airline-passenger-list/airline-passenger-list.component';
import { AirlinePaymentFormComponent } from './partials/airline-payment-form/airline-payment-form.component';
import { AirlineSearchHeaderComponent } from './partials/airline-search-header/airline-search-header.component';
import { AirlineSearchResultComponent } from './partials/airline-search-result/airline-search-result.component';
import { AirportCodeSearchComponent } from './partials/airport-code-search/airport-code-search.component';
import { AirportSearchDateComponent } from './partials/airport-search-date/airport-search-date.component';
import { AirlineOrderRlocComponent } from './partials/airline-order-rloc/airline-order-rloc.component';
import { AirlineSearchTravellersComponent } from './partials/airline-search-travellers/airline-search-travellers.component';
import { AirlineContactFormComponent } from './partials/airline-contact-form/airline-contact-form.component';
import { AirlinePaymentSummaryComponent } from './partials/airline-payment-summary/airline-payment-summary.component';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import { AirlineFlightFareInfoComponent } from './partials/airline-flight-fare-info/airline-flight-fare-info.component';
import { AirlineErrorsComponent } from './partials/airline-errors/airline-errors.component';
import { AirlineReshopComponent } from './pages/airline-reshop/airline-reshop.component';
import { AirlineLoaderComponent } from './partials/airline-loader/airline-loader.component';
import { AirlineOrderChangesComponent } from './partials/airline-order-changes/airline-order-changes.component';

const secondaryRoutes: Routes = [
  {
    path: '',
    component: AirlineComponent,
    children: [
      {
        path: '', component: AirlineDashboardComponent
      },
      {
        path: 'Search', component: AirlineSearchComponent
      },
      {
        path: 'Booking', component: AirlineCreateOrderComponent
      },
      {
        path: 'Orders', component: AirlineOrdersComponent
      },
      {
        path: 'Orders/:id', component: AirlineOrderComponent
      },
      {
        path: 'Payment/:id', component: AirlinePaymentComponent
      },
      {
        path: 'Reshop/:id', component: AirlineReshopComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    AirlineComponent,
    AirlineDashboardComponent,
    AirlineSearchResultComponent,
    AirlineSearchComponent,
    AirlineCreateOrderComponent,
    AirlineOrdersComponent,
    AirlineOrderComponent,
    AirlinePaymentComponent,
    AirlineSeatAvailabilityComponent,
    AirportCodeSearchComponent,
    AirlinePassengerListComponent,
    AirlineOrderSummaryComponent,
    AirlinePaymentFormComponent,
    AirlinePassengerFormComponent,
    AirlineSearchHeaderComponent,
    AirportSearchDateComponent,
    AirlineFlightItemComponent,
    AirlineOrderRlocComponent,
    AirlineSearchTravellersComponent,
    AirlineContactFormComponent,
    AirlineFlightFareInfoComponent,
    AirlinePaymentSummaryComponent,
    AirlineErrorsComponent,
    AirlineReshopComponent,
    AirlineLoaderComponent,
    AirlineOrderChangesComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        AngularMaterialModule,
        RouterModule.forChild(secondaryRoutes),
        NgbPopoverModule,
    ],
  entryComponents: [AirlineSearchResultComponent],
})
export class AirlineModule { }
