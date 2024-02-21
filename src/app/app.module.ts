import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { HeaderInterceptor } from './header-interceptor.interceptor';

import { AuthenticationGuard } from './guard/authentication.guard';
import { AuthorizationGuard } from './guard/authorization.guard';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { DEVTOOLS_REDUX_CONFIG, LOGGER_CONFIG, OPTIONS_CONFIG, STATES_MODULES } from './store/store.config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    NgxsModule.forRoot(STATES_MODULES, OPTIONS_CONFIG),
    NgxsReduxDevtoolsPluginModule.forRoot(DEVTOOLS_REDUX_CONFIG),
    NgxsLoggerPluginModule.forRoot(LOGGER_CONFIG),
  ],
  providers: [
    AuthenticationGuard,
    AuthorizationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
