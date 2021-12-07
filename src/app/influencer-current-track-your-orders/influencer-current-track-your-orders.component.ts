import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../app.service';

@Component({
  selector: 'app-influencer-current-track-your-orders',
  templateUrl: './influencer-current-track-your-orders.component.html',
  styleUrls: ['./influencer-current-track-your-orders.component.scss']
})
export class InfluencerCurrentTrackYourOrdersComponent implements OnInit {

  public loginid:any="";

  constructor(private router:Router, private headerService: HeaderService) { }

  ngOnInit(): void {
    if(!(localStorage.getItem('token')) || (localStorage.getItem('token')) == null || (localStorage.getItem('token')) == 'undefined'){
      this.loginid="";
      }else{
      this.loginid = localStorage.getItem('token');
    }
  }

  signOut() {
    localStorage.removeItem('token');
    this.headerService.updateHeader('loginheader');
    this.router.navigate(['/login']);
  }

}
