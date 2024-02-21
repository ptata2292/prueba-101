import { AirlineenticationStateModel } from './airline.model';

export class SetAirlineData {
  public static readonly type = '[Airline] Airline data';

  constructor(public payload: AirlineenticationStateModel) {}
}


export class SetSelectedAirlineData {
  public static readonly type = '[Airline] Set SelectedAirline data';

  constructor(public payload: any) {}
}


export class DeleteSelectedAirlineData {
  public static readonly type = '[Airline] Delete SelectedAirline data';

  constructor() {}
}

export class SetSearchCriteriaData {
  public static readonly type = '[Airline] Set SearchCriteria data';

  constructor(public payload: any) {}
}


export class DeleteSearchCriteriaData {
  public static readonly type = '[Airline] Delete SearchCriteria data';

  constructor() {}
}
