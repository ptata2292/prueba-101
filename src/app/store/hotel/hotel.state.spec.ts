import { NgxsModule, Store } from '@ngxs/store';
import { async, TestBed } from '@angular/core/testing';
import { HotelStateModule } from './hotel.state';
import { HotelenticationStateModel } from './hotel.model';

import { SetHotelData } from './hotel.actions';

describe('[TEST]: HotelStore', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([HotelStateModule])]
    })
      .compileComponents()
      .then();
    store = TestBed.get(Store);
  }));

  it('Should be correct dispatch and value is empty', () => {
    const Hotelentication: HotelenticationStateModel = {
      selectedHotel: null,
      searchCriteria: null
    };
    store.dispatch(new SetHotelData(Hotelentication));
    store.selectOnce(state => state.hotelStateModule).subscribe(actual => {
      expect(actual).toEqual(Hotelentication);
    });
  });
});
