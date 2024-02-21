import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetGolfData, SetSelectedGolfData, DeleteSelectedGolfData, 
        SetSearchCriteriaData, DeleteSearchCriteriaData } from './golf.actions';
import { config } from 'src/app/shared/config';
import { GolfenticationStateModel } from './golf.model';

@State<GolfenticationStateModel>({
  name: 'golfStateModule',
  defaults: {
    selectedGolf: null,
    searchCriteria: null
  }
})
export class GolfStateModule {

  @Selector()
  public static getGolfData({ getState }: StateContext<GolfenticationStateModel>): GolfenticationStateModel {
    return getState();
  }

  @Action(SetGolfData)
  public setGolfData({ setState, getState }: StateContext<GolfenticationStateModel>, { payload }: SetGolfData) {
    const state = getState();
    setState({
      ...state,
      ...payload
    });
  }

  //selectedGolf
  @Selector()
  public static getSelectedGolf(state: GolfenticationStateModel): string {
    return state.selectedGolf;
  }

  @Selector()
  public static checkSelectedGolf(state: GolfenticationStateModel): boolean {
    return state.selectedGolf == null ?  false : true;
  }

  @Action(SetSelectedGolfData)
  public setSelectedGolf( { patchState }: StateContext<GolfenticationStateModel>, { payload }: SetSelectedGolfData) {
    patchState({ selectedGolf: payload });
  }

  @Action(DeleteSelectedGolfData)
  deleteSelectedGolf( { patchState }: StateContext<GolfenticationStateModel>) {
    patchState({ selectedGolf: null });
  }

  //searchCriteria
  @Selector()
  public static getSearchCriteria(state: GolfenticationStateModel): string {
    return state.searchCriteria;
  }

  @Selector()
  public static checkSearchCriteria(state: GolfenticationStateModel): boolean {
    return state.searchCriteria == null ?  false : true;
  }

  @Action(SetSearchCriteriaData)
  public setSearchCriteria( { patchState }: StateContext<GolfenticationStateModel>, { payload }: SetSearchCriteriaData) {
    patchState({ searchCriteria: payload });
  }

  @Action(DeleteSearchCriteriaData)
  deleteSearchCriteria( { patchState }: StateContext<GolfenticationStateModel>) {
    patchState({ searchCriteria: null });
  }
}
