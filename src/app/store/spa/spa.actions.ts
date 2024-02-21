import { SpaenticationStateModel } from './spa.model';

export class SetSpaData {
  public static readonly type = '[Spa] Spa data';

  constructor(public payload: SpaenticationStateModel) {}
}


export class SetSelectedSpaData {
  public static readonly type = '[Spa] Set SelectedSpa data';

  constructor(public payload: any) {}
}


export class DeleteSelectedSpaData {
  public static readonly type = '[Spa] Delete SelectedSpa data';

  constructor() {}
}

export class SetSearchCriteriaData {
  public static readonly type = '[Spa] Set SearchCriteria data';

  constructor(public payload: any) {}
}


export class DeleteSearchCriteriaData {
  public static readonly type = '[Spa] Delete SearchCriteria data';

  constructor() {}
}
