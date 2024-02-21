import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetAirlineData, SetSelectedAirlineData, DeleteSelectedAirlineData, 
        SetSearchCriteriaData, DeleteSearchCriteriaData } from './airline.actions';
import { config } from 'src/app/shared/config';
import { AirlineenticationStateModel } from './airline.model';

@State<AirlineenticationStateModel>({
  name: 'airlineStateModule',
  defaults: {
    selectedAirline: null,
    searchCriteria: null
  }
})
export class AirlineStateModule {

  @Selector()
  public static getAirlineData({ getState }: StateContext<AirlineenticationStateModel>): AirlineenticationStateModel {
    return getState();
  }

  @Action(SetAirlineData)
  public setAirlineData({ setState, getState }: StateContext<AirlineenticationStateModel>, { payload }: SetAirlineData) {
    const state = getState();
    setState({
      ...state,
      ...payload
    });
  }

  //selectedAirline
  @Selector()
  public static getSelectedAirline(state: AirlineenticationStateModel): string {
    return state.selectedAirline;
  }

  @Selector()
  public static checkSelectedAirline(state: AirlineenticationStateModel): boolean {
    return state.selectedAirline == null ?  false : true;
  }

  @Action(SetSelectedAirlineData)
  public setSelectedAirline( { patchState }: StateContext<AirlineenticationStateModel>, { payload }: SetSelectedAirlineData) {
    patchState({ selectedAirline: payload });
  }

  @Action(DeleteSelectedAirlineData)
  deleteSelectedAirline( { patchState }: StateContext<AirlineenticationStateModel>) {
    patchState({ selectedAirline: null });
  }

  //searchCriteria
  @Selector()
  public static getSearchCriteria(state: AirlineenticationStateModel): string {
    return state.searchCriteria;
  }

  @Selector()
  public static checkSearchCriteria(state: AirlineenticationStateModel): boolean {
    return state.searchCriteria == null ?  false : true;
  }

  @Action(SetSearchCriteriaData)
  public setSearchCriteria( { patchState }: StateContext<AirlineenticationStateModel>, { payload }: SetSearchCriteriaData) {
    patchState({ searchCriteria: payload });
  }

  @Action(DeleteSearchCriteriaData)
  deleteSearchCriteria( { patchState }: StateContext<AirlineenticationStateModel>) {
    patchState({ searchCriteria: null });
  }
}
