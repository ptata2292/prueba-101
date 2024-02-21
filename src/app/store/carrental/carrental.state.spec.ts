import { NgxsModule, Store } from '@ngxs/store';
import { async, TestBed } from '@angular/core/testing';
import { CarrentalStateModule } from './carrental.state';
import { CarrentalenticationStateModel } from './carrental.model';

import { SetCarrentalData } from './carrental.actions';

describe('[TEST]: CarrentalStore', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CarrentalStateModule])]
    })
      .compileComponents()
      .then();
    store = TestBed.get(Store);
  }));

  it('Should be correct dispatch and value is empty', () => {
    const Carrentalentication: CarrentalenticationStateModel = {
      selectedCarrental: null,
      searchCriteria: null
    };
    store.dispatch(new SetCarrentalData(Carrentalentication));
    store.selectOnce(state => state.carrentalStateModule).subscribe(actual => {
      expect(actual).toEqual(Carrentalentication);
    });
  });
});
