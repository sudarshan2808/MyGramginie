import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService, HttpIntercepter } from '../app.service';

@Component({
  selector: 'app-all-job',
  templateUrl: './all-job.component.html',
  styleUrls: ['./all-job.component.scss']
})
export class AllJobComponent implements OnInit {

  showAllJob : any;
  public loginid:any="";
  
  constructor(private authttp: HttpIntercepter, 
        private router: Router, 
        private headerService: HeaderService) { }

  ngOnInit(): void {
    this.authttp.get('all_job').subscribe(
        res=>{
          // console.log(res);
        this.showAllJob = res;
        console.log(this.showAllJob);
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
