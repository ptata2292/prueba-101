import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetSpaData, SetSelectedSpaData, DeleteSelectedSpaData, 
        SetSearchCriteriaData, DeleteSearchCriteriaData } from './spa.actions';
import { config } from 'src/app/shared/config';
import { SpaenticationStateModel } from './spa.model';

@State<SpaenticationStateModel>({
  name: 'spaStateModule',
  defaults: {
    selectedSpa: null,
    searchCriteria: null
  }
})
export class SpaStateModule {

  @Selector()
  public static getSpaData({ getState }: StateContext<SpaenticationStateModel>): SpaenticationStateModel {
    return getState();
  }

  @Action(SetSpaData)
  public setSpaData({ setState, getState }: StateContext<SpaenticationStateModel>, { payload }: SetSpaData) {
    const state = getState();
    setState({
      ...state,
      ...payload
    });
  }

  //selectedSpa
  @Selector()
  public static getSelectedSpa(state: SpaenticationStateModel): string {
    return state.selectedSpa;
  }

  @Selector()
  public static checkSelectedSpa(state: SpaenticationStateModel): boolean {
    return state.selectedSpa == null ?  false : true;
  }

  @Action(SetSelectedSpaData)
  public setSelectedSpa( { patchState }: StateContext<SpaenticationStateModel>, { payload }: SetSelectedSpaData) {
    patchState({ selectedSpa: payload });
  }

  @Action(DeleteSelectedSpaData)
  deleteSelectedSpa( { patchState }: StateContext<SpaenticationStateModel>) {
    patchState({ selectedSpa: null });
  }

  //searchCriteria
  @Selector()
  public static getSearchCriteria(state: SpaenticationStateModel): string {
    return state.searchCriteria;
  }

  @Selector()
  public static checkSearchCriteria(state: SpaenticationStateModel): boolean {
    return state.searchCriteria == null ?  false : true;
  }

  @Action(SetSearchCriteriaData)
  public setSearchCriteria( { patchState }: StateContext<SpaenticationStateModel>, { payload }: SetSearchCriteriaData) {
    patchState({ searchCriteria: payload });
  }

  @Action(DeleteSearchCriteriaData)
  deleteSearchCriteria( { patchState }: StateContext<SpaenticationStateModel>) {
    patchState({ searchCriteria: null });
  }
}
