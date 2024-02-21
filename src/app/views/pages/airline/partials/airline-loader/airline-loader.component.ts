import { Component, Input, OnInit } from '@angular/core';
import { AirlineLoaderService } from '../../services/airline-loader.service';

@Component({
  selector: 'app-airline-loader',
  templateUrl: './airline-loader.component.html',
  styleUrls: ['./airline-loader.component.scss']
})
export class AirlineLoaderComponent implements OnInit {

  @Input() spinnerClass = "spinner";

  constructor(public airlineLoaderService: AirlineLoaderService) {
  }

  ngOnInit(): void {
  }
}
