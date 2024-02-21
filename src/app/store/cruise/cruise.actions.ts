import { CruiseenticationStateModel } from './cruise.model';

export class SetCruiseData {
  public static readonly type = '[Cruise] Cruise data';

  constructor(public payload: CruiseenticationStateModel) {}
}


export class SetSelectedCruiseData {
  public static readonly type = '[Cruise] Set SelectedCruise data';

  constructor(public payload: any) {}
}


export class DeleteSelectedCruiseData {
  public static readonly type = '[Cruise] Delete SelectedCruise data';

  constructor() {}
}

export class SetSearchCriteriaData {
  public static readonly type = '[Cruise] Set SearchCriteria data';

  constructor(public payload: any) {}
}


export class DeleteSearchCriteriaData {
  public static readonly type = '[Cruise] Delete SearchCriteria data';

  constructor() {}
}
