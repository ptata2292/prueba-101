import { GolfenticationStateModel } from './golf.model';

export class SetGolfData {
  public static readonly type = '[Golf] Golf data';

  constructor(public payload: GolfenticationStateModel) {}
}


export class SetSelectedGolfData {
  public static readonly type = '[Golf] Set SelectedGolf data';

  constructor(public payload: any) {}
}


export class DeleteSelectedGolfData {
  public static readonly type = '[Golf] Delete SelectedGolf data';

  constructor() {}
}

export class SetSearchCriteriaData {
  public static readonly type = '[Golf] Set SearchCriteria data';

  constructor(public payload: any) {}
}


export class DeleteSearchCriteriaData {
  public static readonly type = '[Golf] Delete SearchCriteria data';

  constructor() {}
}
