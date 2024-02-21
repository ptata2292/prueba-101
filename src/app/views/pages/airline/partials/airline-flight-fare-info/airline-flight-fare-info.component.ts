import {Component, Input} from '@angular/core';
import {AirlineFlightRuleViewModel} from '../../viewmodels/airline-flight-rule';
import {collapseAnimation} from '../../../../../animations';
import {FlightFarePriceInfoViewType} from '../../enums/flight-fare-price-info-view.enum';

@Component({
    selector: 'app-airline-flight-fare-info',
    templateUrl: './airline-flight-fare-info.component.html',
    styleUrls: ['./airline-flight-fare-info.component.scss'],
    animations: [
        collapseAnimation,
    ],
})
export class AirlineFlightFareInfoComponent {
    @Input() flightRules: AirlineFlightRuleViewModel[];
    @Input() viewType = FlightFarePriceInfoViewType.Plain;
    @Input() collapseLabel = 'Flight info';

    FlightFarePriceInfoViewType = FlightFarePriceInfoViewType;

    collapsed = true;

    toggleInfoPopup(event, popover): void{ 
        event.stopPropagation();
        popover.toggle();
    }

    toggleCollapse(): void{
        this.collapsed = !this.collapsed;
    }
}
