import { CarrentalenticationStateModel } from './carrental.model';

export class SetCarrentalData {
  public static readonly type = '[Carrental] Carrental data';

  constructor(public payload: CarrentalenticationStateModel) {}
}


export class SetSelectedCarrentalData {
  public static readonly type = '[Carrental] Set SelectedCarrental data';

  constructor(public payload: any) {}
}


export class DeleteSelectedCarrentalData {
  public static readonly type = '[Carrental] Delete SelectedCarrental data';

  constructor() {}
}

export class SetSearchCriteriaData {
  public static readonly type = '[Carrental] Set SearchCriteria data';

  constructor(public payload: any) {}
}


export class DeleteSearchCriteriaData {
  public static readonly type = '[Carrental] Delete SearchCriteria data';

  constructor() {}
}
