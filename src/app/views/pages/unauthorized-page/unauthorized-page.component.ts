import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized-page',
  templateUrl: './unauthorized-page.component.html',
  styleUrls: ['./unauthorized-page.component.css']
})
export class UnauthorizedPageComponent implements OnInit {

  constructor() { 
    document.body.style.backgroundSize = "100% 70px";
  }

  ngOnInit(): void {
  }

}
