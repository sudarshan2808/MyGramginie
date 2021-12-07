import { HeaderService, HttpIntercepter } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.scss']
})
export class MyJobComponent implements OnInit {

  showMyJob : any;
  public loginid:any="";

  constructor(private authttp: HttpIntercepter, private router:Router, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.authttp.get('my_job').subscribe(
        res=>{
          // console.log(res);
        this.showMyJob = res;
        console.log(this.showMyJob);
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
