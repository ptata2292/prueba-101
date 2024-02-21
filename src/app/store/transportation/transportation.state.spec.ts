import { NgxsModule, Store } from '@ngxs/store';
import { async, TestBed } from '@angular/core/testing';
import { TransportationStateModule } from './transportation.state';
import { TransportationenticationStateModel } from './transportation.model';

import { SetTransportationData } from './transportation.actions';

describe('[TEST]: TransportationStore', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TransportationStateModule])]
    })
      .compileComponents()
      .then();
    store = TestBed.get(Store);
  }));

  it('Should be correct dispatch and value is empty', () => {
    const Transportationentication: TransportationenticationStateModel = {
      selectedTransportation: null,
      searchCriteria: null
    };
    store.dispatch(new SetTransportationData(Transportationentication));
    store.selectOnce(state => state.transportationStateModule).subscribe(actual => {
      expect(actual).toEqual(Transportationentication);
    });
  });
});
