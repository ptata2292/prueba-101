import { NgxsModule, Store } from '@ngxs/store';
import { async, TestBed } from '@angular/core/testing';
import { GolfStateModule } from './golf.state';
import { GolfenticationStateModel } from './golf.model';

import { SetGolfData } from './golf.actions';

describe('[TEST]: GolfStore', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GolfStateModule])]
    })
      .compileComponents()
      .then();
    store = TestBed.get(Store);
  }));

  it('Should be correct dispatch and value is empty', () => {
    const Golfentication: GolfenticationStateModel = {
      selectedGolf: null,
      searchCriteria: null
    };
    store.dispatch(new SetGolfData(Golfentication));
    store.selectOnce(state => state.golfStateModule).subscribe(actual => {
      expect(actual).toEqual(Golfentication);
    });
  });
});
