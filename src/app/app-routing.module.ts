import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './views/pages/page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './views/pages/access-denied/access-denied.component';
import { UnauthorizedPageComponent } from './views/pages/unauthorized-page/unauthorized-page.component';

import { ThemeModule } from '././views/theme/theme.module';
import { BaseComponent } from './views/theme/base/base.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { AuthorizationGuard } from './guard/authorization.guard';
import { config } from './shared/config';

const routes: Routes = [
  // { path: '' , redirectTo: config.objectRouting.Flights.URLLink, pathMatch: 'full'},
  { path: 'login', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)},
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthenticationGuard, AuthorizationGuard],
    children: [
      // { path: '', redirectTo: config.objectRouting.Flights.URLLink, pathMatch: 'full'},
      {
        path: '',
        loadChildren: () => import('./views/pages/airline/airline.module').then(m => m.AirlineModule),
        canActivate: [AuthorizationGuard]
      },
      {
        path: config.objectRouting.Flights.URLLink,
        loadChildren: () => import('./views/pages/airline/airline.module').then(m => m.AirlineModule),
        canActivate: [AuthorizationGuard]
      },
      {
        path: config.objectRouting.Hotels.URLLink,
        loadChildren: () => import('./views/pages/hotel/hotel.module').then(m => m.HotelModule),
        canActivate: [AuthorizationGuard]
      },
      {
        path: config.objectRouting.CarRental.URLLink,
        loadChildren: () => import('./views/pages/carrental/carrental.module').then(m => m.CarrentalModule),
        canActivate: [AuthorizationGuard]
      },
      {
        path: config.objectRouting.Golf.URLLink,
        loadChildren: () => import('./views/pages/golf/golf.module').then(m => m.GolfModule),
        canActivate: [AuthorizationGuard]
      },
      {
        path: config.objectRouting.Spa.URLLink,
        loadChildren: () => import('./views/pages/spa/spa.module').then(m => m.SpaModule),
        canActivate: [AuthorizationGuard]
      },
      {
        path: config.objectRouting.Rail.URLLink,
        loadChildren: () => import('./views/pages/rail/rail.module').then(m => m.RailModule),
        canActivate: [AuthorizationGuard]
      },
      {
        path: config.objectRouting.Cruise.URLLink,
        loadChildren: () => import('./views/pages/cruise/cruise.module').then(m => m.CruiseModule),
        canActivate: [AuthorizationGuard]
      },
      {
        path: config.objectRouting.Transportation.URLLink,
        loadChildren: () => import('./views/pages/transportation/transportation.module').then(m => m.TransportationModule),
        canActivate: [AuthorizationGuard]
      },
      { path: 'denied', component : AccessDeniedComponent },
      { path: 'unauthorized', component : UnauthorizedPageComponent },
      { path: '**', component : PageNotFoundComponent }
    ]
  },
  { path: '**', component : PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    onSameUrlNavigation: 'reload'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
