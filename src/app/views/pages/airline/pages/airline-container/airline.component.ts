import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AirlineErrorService } from '../../services/airline-error.service';
import { AirlineLoaderService } from '../../services/airline-loader.service';

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit {

  constructor(private router: Router, private airlineErrorService: AirlineErrorService, public airlineLoaderService: AirlineLoaderService) { 
    this.router.events.subscribe(val => {
      this.airlineErrorService.hideErrors();
      //this.airlineLoaderService.hideLoader();
    }); 
  }

  ngOnInit() {
  }

}
