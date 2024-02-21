import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetRailData, SetSelectedRailData, DeleteSelectedRailData, 
        SetSearchCriteriaData, DeleteSearchCriteriaData } from './rail.actions';
import { config } from 'src/app/shared/config';
import { RailenticationStateModel } from './rail.model';

@State<RailenticationStateModel>({
  name: 'railStateModule',
  defaults: {
    selectedRail: null,
    searchCriteria: null
  }
})
export class RailStateModule {

  @Selector()
  public static getRailData({ getState }: StateContext<RailenticationStateModel>): RailenticationStateModel {
    return getState();
  }

  @Action(SetRailData)
  public setRailData({ setState, getState }: StateContext<RailenticationStateModel>, { payload }: SetRailData) {
    const state = getState();
    setState({
      ...state,
      ...payload
    });
  }

  //selectedRail
  @Selector()
  public static getSelectedRail(state: RailenticationStateModel): string {
    return state.selectedRail;
  }

  @Selector()
  public static checkSelectedRail(state: RailenticationStateModel): boolean {
    return state.selectedRail == null ?  false : true;
  }

  @Action(SetSelectedRailData)
  public setSelectedRail( { patchState }: StateContext<RailenticationStateModel>, { payload }: SetSelectedRailData) {
    patchState({ selectedRail: payload });
  }

  @Action(DeleteSelectedRailData)
  deleteSelectedRail( { patchState }: StateContext<RailenticationStateModel>) {
    patchState({ selectedRail: null });
  }

  //searchCriteria
  @Selector()
  public static getSearchCriteria(state: RailenticationStateModel): string {
    return state.searchCriteria;
  }

  @Selector()
  public static checkSearchCriteria(state: RailenticationStateModel): boolean {
    return state.searchCriteria == null ?  false : true;
  }

  @Action(SetSearchCriteriaData)
  public setSearchCriteria( { patchState }: StateContext<RailenticationStateModel>, { payload }: SetSearchCriteriaData) {
    patchState({ searchCriteria: payload });
  }

  @Action(DeleteSearchCriteriaData)
  deleteSearchCriteria( { patchState }: StateContext<RailenticationStateModel>) {
    patchState({ searchCriteria: null });
  }
}
