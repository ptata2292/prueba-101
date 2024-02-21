import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetHotelData, SetSelectedHotelData, DeleteSelectedHotelData, 
        SetSearchCriteriaData, DeleteSearchCriteriaData } from './hotel.actions';
import { config } from 'src/app/shared/config';
import { HotelenticationStateModel } from './hotel.model';

@State<HotelenticationStateModel>({
  name: 'hotelStateModule',
  defaults: {
    selectedHotel: null,
    searchCriteria: null
  }
})
export class HotelStateModule {

  @Selector()
  public static getHotelData({ getState }: StateContext<HotelenticationStateModel>): HotelenticationStateModel {
    return getState();
  }

  @Action(SetHotelData)
  public setHotelData({ setState, getState }: StateContext<HotelenticationStateModel>, { payload }: SetHotelData) {
    const state = getState();
    setState({
      ...state,
      ...payload
    });
  }

  //selectedHotel
  @Selector()
  public static getSelectedHotel(state: HotelenticationStateModel): string {
    return state.selectedHotel;
  }

  @Selector()
  public static checkSelectedHotel(state: HotelenticationStateModel): boolean {
    return state.selectedHotel == null ?  false : true;
  }

  @Action(SetSelectedHotelData)
  public setSelectedHotel( { patchState }: StateContext<HotelenticationStateModel>, { payload }: SetSelectedHotelData) {
    patchState({ selectedHotel: payload });
  }

  @Action(DeleteSelectedHotelData)
  deleteSelectedHotel( { patchState }: StateContext<HotelenticationStateModel>) {
    patchState({ selectedHotel: null });
  }

  //searchCriteria
  @Selector()
  public static getSearchCriteria(state: HotelenticationStateModel): string {
    return state.searchCriteria;
  }

  @Selector()
  public static checkSearchCriteria(state: HotelenticationStateModel): boolean {
    return state.searchCriteria == null ?  false : true;
  }

  @Action(SetSearchCriteriaData)
  public setSearchCriteria( { patchState }: StateContext<HotelenticationStateModel>, { payload }: SetSearchCriteriaData) {
    patchState({ searchCriteria: payload });
  }

  @Action(DeleteSearchCriteriaData)
  deleteSearchCriteria( { patchState }: StateContext<HotelenticationStateModel>) {
    patchState({ searchCriteria: null });
  }
}
