import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetCruiseData, SetSelectedCruiseData, DeleteSelectedCruiseData, 
        SetSearchCriteriaData, DeleteSearchCriteriaData } from './cruise.actions';
import { config } from 'src/app/shared/config';
import { CruiseenticationStateModel } from './cruise.model';

@State<CruiseenticationStateModel>({
  name: 'cruiseStateModule',
  defaults: {
    selectedCruise: null,
    searchCriteria: null
  }
})
export class CruiseStateModule {

  @Selector()
  public static getCruiseData({ getState }: StateContext<CruiseenticationStateModel>): CruiseenticationStateModel {
    return getState();
  }

  @Action(SetCruiseData)
  public setCruiseData({ setState, getState }: StateContext<CruiseenticationStateModel>, { payload }: SetCruiseData) {
    const state = getState();
    setState({
      ...state,
      ...payload
    });
  }

  //selectedCruise
  @Selector()
  public static getSelectedCruise(state: CruiseenticationStateModel): string {
    return state.selectedCruise;
  }

  @Selector()
  public static checkSelectedCruise(state: CruiseenticationStateModel): boolean {
    return state.selectedCruise == null ?  false : true;
  }

  @Action(SetSelectedCruiseData)
  public setSelectedCruise( { patchState }: StateContext<CruiseenticationStateModel>, { payload }: SetSelectedCruiseData) {
    patchState({ selectedCruise: payload });
  }

  @Action(DeleteSelectedCruiseData)
  deleteSelectedCruise( { patchState }: StateContext<CruiseenticationStateModel>) {
    patchState({ selectedCruise: null });
  }

  //searchCriteria
  @Selector()
  public static getSearchCriteria(state: CruiseenticationStateModel): string {
    return state.searchCriteria;
  }

  @Selector()
  public static checkSearchCriteria(state: CruiseenticationStateModel): boolean {
    return state.searchCriteria == null ?  false : true;
  }

  @Action(SetSearchCriteriaData)
  public setSearchCriteria( { patchState }: StateContext<CruiseenticationStateModel>, { payload }: SetSearchCriteriaData) {
    patchState({ searchCriteria: payload });
  }

  @Action(DeleteSearchCriteriaData)
  deleteSearchCriteria( { patchState }: StateContext<CruiseenticationStateModel>) {
    patchState({ searchCriteria: null });
  }
}
