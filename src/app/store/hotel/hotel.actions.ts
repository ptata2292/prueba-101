import { HotelenticationStateModel } from './hotel.model';

export class SetHotelData {
  public static readonly type = '[Hotel] Hotel data';

  constructor(public payload: HotelenticationStateModel) {}
}


export class SetSelectedHotelData {
  public static readonly type = '[Hotel] Set SelectedHotel data';

  constructor(public payload: any) {}
}


export class DeleteSelectedHotelData {
  public static readonly type = '[Hotel] Delete SelectedHotel data';

  constructor() {}
}

export class SetSearchCriteriaData {
  public static readonly type = '[Hotel] Set SearchCriteria data';

  constructor(public payload: any) {}
}


export class DeleteSearchCriteriaData {
  public static readonly type = '[Hotel] Delete SearchCriteria data';

  constructor() {}
}
