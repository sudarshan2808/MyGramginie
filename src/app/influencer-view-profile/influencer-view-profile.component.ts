import { HeaderService, HttpIntercepter } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-influencer-view-profile',
  templateUrl: './influencer-view-profile.component.html',
  styleUrls: ['./influencer-view-profile.component.scss']
})
export class InfluencerViewProfileComponent implements OnInit {
 
  viewInfluencer: any;
  public loginid:any="";
  
  constructor(private authttp: HttpIntercepter, private router:Router, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.authttp.get('influencer_data_show').subscribe(
      res =>{
        this.viewInfluencer = res;
        console.log(this.viewInfluencer);
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
