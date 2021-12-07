import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService, HttpIntercepter } from '../app.service';

@Component({
  selector: 'app-my-listing',
  templateUrl: './my-listing.component.html',
  styleUrls: ['./my-listing.component.scss']
})
export class MyListingComponent implements OnInit {
  
  myListing: any;
  public loginid:any="";
  
  constructor(private authttp: HttpIntercepter, private router:Router, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.authttp.get('my_listing').subscribe(
      res =>{
        this.myListing = res;
        console.log(this.myListing);
    });

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
