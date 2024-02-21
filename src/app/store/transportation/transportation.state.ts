import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetTransportationData, SetSelectedTransportationData, DeleteSelectedTransportationData, 
        SetSearchCriteriaData, DeleteSearchCriteriaData } from './transportation.actions';
import { config } from 'src/app/shared/config';
import { TransportationenticationStateModel } from './transportation.model';

@State<TransportationenticationStateModel>({
  name: 'transportationStateModule',
  defaults: {
    selectedTransportation: null,
    searchCriteria: null
  }
})
export class TransportationStateModule {

  @Selector()
  public static getTransportationData({ getState }: StateContext<TransportationenticationStateModel>): TransportationenticationStateModel {
    return getState();
  }

  @Action(SetTransportationData)
  public setTransportationData({ setState, getState }: StateContext<TransportationenticationStateModel>, { payload }: SetTransportationData) {
    const state = getState();
    setState({
      ...state,
      ...payload
    });
  }

  //selectedTransportation
  @Selector()
  public static getSelectedTransportation(state: TransportationenticationStateModel): string {
    return state.selectedTransportation;
  }

  @Selector()
  public static checkSelectedTransportation(state: TransportationenticationStateModel): boolean {
    return state.selectedTransportation == null ?  false : true;
  }

  @Action(SetSelectedTransportationData)
  public setSelectedTransportation( { patchState }: StateContext<TransportationenticationStateModel>, { payload }: SetSelectedTransportationData) {
    patchState({ selectedTransportation: payload });
  }

  @Action(DeleteSelectedTransportationData)
  deleteSelectedTransportation( { patchState }: StateContext<TransportationenticationStateModel>) {
    patchState({ selectedTransportation: null });
  }

  //searchCriteria
  @Selector()
  public static getSearchCriteria(state: TransportationenticationStateModel): string {
    return state.searchCriteria;
  }

  @Selector()
  public static checkSearchCriteria(state: TransportationenticationStateModel): boolean {
    return state.searchCriteria == null ?  false : true;
  }

  @Action(SetSearchCriteriaData)
  public setSearchCriteria( { patchState }: StateContext<TransportationenticationStateModel>, { payload }: SetSearchCriteriaData) {
    patchState({ searchCriteria: payload });
  }

  @Action(DeleteSearchCriteriaData)
  deleteSearchCriteria( { patchState }: StateContext<TransportationenticationStateModel>) {
    patchState({ searchCriteria: null });
  }
}
