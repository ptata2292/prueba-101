import { TransportationenticationStateModel } from './transportation.model';

export class SetTransportationData {
  public static readonly type = '[Transportation] Transportation data';

  constructor(public payload: TransportationenticationStateModel) {}
}


export class SetSelectedTransportationData {
  public static readonly type = '[Transportation] Set SelectedTransportation data';

  constructor(public payload: any) {}
}


export class DeleteSelectedTransportationData {
  public static readonly type = '[Transportation] Delete SelectedTransportation data';

  constructor() {}
}

export class SetSearchCriteriaData {
  public static readonly type = '[Transportation] Set SearchCriteria data';

  constructor(public payload: any) {}
}


export class DeleteSearchCriteriaData {
  public static readonly type = '[Transportation] Delete SearchCriteria data';

  constructor() {}
}
