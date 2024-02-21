import { RailenticationStateModel } from './rail.model';

export class SetRailData {
  public static readonly type = '[Rail] Rail data';

  constructor(public payload: RailenticationStateModel) {}
}


export class SetSelectedRailData {
  public static readonly type = '[Rail] Set SelectedRail data';

  constructor(public payload: any) {}
}


export class DeleteSelectedRailData {
  public static readonly type = '[Rail] Delete SelectedRail data';

  constructor() {}
}

export class SetSearchCriteriaData {
  public static readonly type = '[Rail] Set SearchCriteria data';

  constructor(public payload: any) {}
}


export class DeleteSearchCriteriaData {
  public static readonly type = '[Rail] Delete SearchCriteria data';

  constructor() {}
}
