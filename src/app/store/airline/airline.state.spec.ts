import { NgxsModule, Store } from '@ngxs/store';
import { async, TestBed } from '@angular/core/testing';
import { AirlineStateModule } from './airline.state';
import { AirlineenticationStateModel } from './airline.model';

import { SetAirlineData } from './airline.actions';

describe('[TEST]: AirlineStore', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AirlineStateModule])]
    })
      .compileComponents()
      .then();
    store = TestBed.get(Store);
  }));

  it('Should be correct dispatch and value is empty', () => {
    const Airlineentication: AirlineenticationStateModel = {
      selectedAirline: null,
      searchCriteria: null
    };
    store.dispatch(new SetAirlineData(Airlineentication));
    store.selectOnce(state => state.airlineStateModule).subscribe(actual => {
      expect(actual).toEqual(Airlineentication);
    });
  });
});
