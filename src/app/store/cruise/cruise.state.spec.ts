import { NgxsModule, Store } from '@ngxs/store';
import { async, TestBed } from '@angular/core/testing';
import { CruiseStateModule } from './cruise.state';
import { CruiseenticationStateModel } from './cruise.model';

import { SetCruiseData } from './cruise.actions';

describe('[TEST]: CruiseStore', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CruiseStateModule])]
    })
      .compileComponents()
      .then();
    store = TestBed.get(Store);
  }));

  it('Should be correct dispatch and value is empty', () => {
    const Cruiseentication: CruiseenticationStateModel = {
      selectedCruise: null,
      searchCriteria: null
    };
    store.dispatch(new SetCruiseData(Cruiseentication));
    store.selectOnce(state => state.cruiseStateModule).subscribe(actual => {
      expect(actual).toEqual(Cruiseentication);
    });
  });
});
