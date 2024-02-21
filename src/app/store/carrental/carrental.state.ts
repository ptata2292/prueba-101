import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetCarrentalData, SetSelectedCarrentalData, DeleteSelectedCarrentalData, 
        SetSearchCriteriaData, DeleteSearchCriteriaData } from './carrental.actions';
import { config } from 'src/app/shared/config';
import { CarrentalenticationStateModel } from './carrental.model';

@State<CarrentalenticationStateModel>({
  name: 'carrentalStateModule',
  defaults: {
    selectedCarrental: null,
    searchCriteria: null
  }
})
export class CarrentalStateModule {

  @Selector()
  public static getCarrentalData({ getState }: StateContext<CarrentalenticationStateModel>): CarrentalenticationStateModel {
    return getState();
  }

  @Action(SetCarrentalData)
  public setCarrentalData({ setState, getState }: StateContext<CarrentalenticationStateModel>, { payload }: SetCarrentalData) {
    const state = getState();
    setState({
      ...state,
      ...payload
    });
  }

  //selectedCarrental
  @Selector()
  public static getSelectedCarrental(state: CarrentalenticationStateModel): string {
    return state.selectedCarrental;
  }

  @Selector()
  public static checkSelectedCarrental(state: CarrentalenticationStateModel): boolean {
    return state.selectedCarrental == null ?  false : true;
  }

  @Action(SetSelectedCarrentalData)
  public setSelectedCarrental( { patchState }: StateContext<CarrentalenticationStateModel>, { payload }: SetSelectedCarrentalData) {
    patchState({ selectedCarrental: payload });
  }

  @Action(DeleteSelectedCarrentalData)
  deleteSelectedCarrental( { patchState }: StateContext<CarrentalenticationStateModel>) {
    patchState({ selectedCarrental: null });
  }

  //searchCriteria
  @Selector()
  public static getSearchCriteria(state: CarrentalenticationStateModel): string {
    return state.searchCriteria;
  }

  @Selector()
  public static checkSearchCriteria(state: CarrentalenticationStateModel): boolean {
    return state.searchCriteria == null ?  false : true;
  }

  @Action(SetSearchCriteriaData)
  public setSearchCriteria( { patchState }: StateContext<CarrentalenticationStateModel>, { payload }: SetSearchCriteriaData) {
    patchState({ searchCriteria: payload });
  }

  @Action(DeleteSearchCriteriaData)
  deleteSearchCriteria( { patchState }: StateContext<CarrentalenticationStateModel>) {
    patchState({ searchCriteria: null });
  }
}
