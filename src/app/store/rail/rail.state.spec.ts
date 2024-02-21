import { NgxsModule, Store } from '@ngxs/store';
import { async, TestBed } from '@angular/core/testing';
import { RailStateModule } from './rail.state';
import { RailenticationStateModel } from './rail.model';

import { SetRailData } from './rail.actions';

describe('[TEST]: RailStore', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([RailStateModule])]
    })
      .compileComponents()
      .then();
    store = TestBed.get(Store);
  }));

  it('Should be correct dispatch and value is empty', () => {
    const Railentication: RailenticationStateModel = {
      selectedRail: null,
      searchCriteria: null
    };
    store.dispatch(new SetRailData(Railentication));
    store.selectOnce(state => state.railStateModule).subscribe(actual => {
      expect(actual).toEqual(Railentication);
    });
  });
});
