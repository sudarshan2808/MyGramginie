import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-to-buy',
  templateUrl: './how-to-buy.component.html',
  styleUrls: ['./how-to-buy.component.scss']
})
export class HowToBuyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
  }

}
