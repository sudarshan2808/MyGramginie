import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService, HttpIntercepter } from '../app.service';

@Component({
  selector: 'app-all-listing',
  templateUrl: './all-listing.component.html',
  styleUrls: ['./all-listing.component.scss']
})
export class AllListingComponent implements OnInit {

  allListing: any;
  public loginid:any="";
  
  constructor(private authttp: HttpIntercepter, private router: Router, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.authttp.get('all_listing').subscribe(
      res =>{
        this.allListing = res;
        console.log(this.allListing);
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
