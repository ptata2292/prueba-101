import { Component, Input, OnInit } from '@angular/core';
import { AirlineErrorService } from '../../services/airline-error.service';

@Component({
  selector: 'app-airline-errors',
  templateUrl: './airline-errors.component.html',
  styleUrls: ['./airline-errors.component.scss']
})
export class AirlineErrorsComponent implements OnInit {

  constructor(public airlineErrorService: AirlineErrorService) { 
    
  }

  ngOnInit(): void {
  }

  hide(){
    this.airlineErrorService.hideErrors();
  }
}
