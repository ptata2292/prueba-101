import { NgxsModule, Store } from '@ngxs/store';
import { async, TestBed } from '@angular/core/testing';
import { SpaStateModule } from './spa.state';
import { SpaenticationStateModel } from './spa.model';

import { SetSpaData } from './spa.actions';

describe('[TEST]: SpaStore', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SpaStateModule])]
    })
      .compileComponents()
      .then();
    store = TestBed.get(Store);
  }));

  it('Should be correct dispatch and value is empty', () => {
    const Spaentication: SpaenticationStateModel = {
      selectedSpa: null,
      searchCriteria: null
    };
    store.dispatch(new SetSpaData(Spaentication));
    store.selectOnce(state => state.spaStateModule).subscribe(actual => {
      expect(actual).toEqual(Spaentication);
    });
  });
});
