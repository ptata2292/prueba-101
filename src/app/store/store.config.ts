import { AirlineStateModule } from './airline/airline.state';
import { HotelStateModule } from './hotel/hotel.state';
import { CarrentalStateModule } from './carrental/carrental.state';
import { CruiseStateModule } from './cruise/cruise.state';
import { GolfStateModule } from './golf/golf.state';
import { RailStateModule } from './rail/rail.state';
import { SpaStateModule } from './spa/spa.state';
import { TransportationStateModule } from './transportation/transportation.state';
import { NgxsConfig } from '@ngxs/store/src/symbols';
import { NgxsDevtoolsOptions } from '@ngxs/devtools-plugin/src/symbols';
import { NgxsLoggerPluginOptions } from '@ngxs/logger-plugin/src/symbols';
import { environment } from '../../environments/environment';

export const STATES_MODULES = [AirlineStateModule, HotelStateModule, CarrentalStateModule, CruiseStateModule,
  GolfStateModule, RailStateModule, SpaStateModule, TransportationStateModule];

export const OPTIONS_CONFIG: Partial<NgxsConfig> = {
  developmentMode: !environment.production
};

export const DEVTOOLS_REDUX_CONFIG: NgxsDevtoolsOptions = {
  disabled: environment.production
};

export const LOGGER_CONFIG: NgxsLoggerPluginOptions = {
  disabled: environment.production
};
