import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService, HttpIntercepter } from '../app.service';

@Component({
  selector: 'app-influencer-profile',
  templateUrl: './influencer-profile.component.html',
  styleUrls: ['./influencer-profile.component.scss']
})
export class InfluencerProfileComponent implements OnInit {

  profileInfluencer: any;
  public loginid:any="";
  
  constructor(private authttp: HttpIntercepter, private router:Router, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.authttp.get('influencer_data_show').subscribe(
      res =>{
        this.profileInfluencer = res;
        console.log(this.profileInfluencer);
    })

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

