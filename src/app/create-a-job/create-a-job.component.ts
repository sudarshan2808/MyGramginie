import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderService, HttpIntercepter, LoaderService } from '../app.service';

@Component({
  selector: 'app-create-a-job',
  templateUrl: './create-a-job.component.html',
  styleUrls: ['./create-a-job.component.scss']
})
export class CreateAJobComponent implements OnInit {

  filePath: string;
  platformForm: FormGroup;
  infojobForm: FormGroup;
  joblistingForm: FormGroup;
  imageUpload: string[];

  selectedTab = 0;
  isClassOneActive: boolean[] = [];

  public loginid:any="";
  
  constructor(
    private loader:LoaderService,
    private authttp: HttpIntercepter,
    private toastr: ToastrService,
    private router: Router,
    private headerService: HeaderService
  ) { }
  
  ngOnInit(): void {

    this.platformForm = new FormGroup({
      platform: new FormControl()
    })

    this.infojobForm = new FormGroup({
      job_category: new FormControl(),
      title_of_job: new FormControl(),
      job_description: new FormControl()
    })

    this.joblistingForm = new FormGroup({
      job_image: new FormControl(),
      advt_description: new FormControl(),
      URL_link: new FormControl(),
      budget_advt: new FormControl(),
      duration_advt: new FormControl(),
      delivery_advt: new FormControl(),
    })


    if(!(localStorage.getItem('token')) || (localStorage.getItem('token')) == null || (localStorage.getItem('token')) == 'undefined'){
      this.loginid="";
      }else{
      this.loginid = localStorage.getItem('token');
    }
  }


  onSubmit() {
    console.log(this.infojobForm.value);
  }
  onSubmition() {
    console.log(this.joblistingForm.value);
  } 

  jobPlatform() {
    const formValue1 = this.platformForm.value;
  }
  jobInfo() {
    const formValue2 = this.infojobForm.value;
  }
  jobList() {
    const formValue3 = this.joblistingForm.value;
  }


  imagePreview(e: any) {
    // this.loader.start();
    const file = e.target.files[0];
    this.joblistingForm.patchValue({
      img: file
    });
    
    this.joblistingForm.get('img')?.updateValueAndValidity()
    
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
      console.log(this.filePath);
      this.imageUpload = this.filePath.split(',');
      console.log(this.imageUpload);

      // let formData = new FormData();
      // formData.append('image', this.imageUpload[1]);
      
      // const formValue0 = this.imgUpload.value;
      // let requestObj = {};
      // requestObj['image'] = formValue0.image;

      // return this.authttp.post('profile_setup',formValue0).subscribe(
      //   res =>{
      //     console.log(res);
      //     console.log(formValue0);
      //     this.loader.stop();
          
      //     if(res.success == true){
      //       this.isClassOneActive[this.selectedTab-1] = true;
      //       this.isClassOneActive[this.selectedTab] = true;
      //       this.selectedTab += 1;
      //       this.toastr.success(res.message);        
      //     }
      //   },
      //   err => {
      //     this.toastr.error('Something went wrong. Please try again.');
      //     this.loader.stop();
      // });
    }
    reader?.readAsDataURL(file)
  }


  createJob() {

    const jobPlatformData = this.platformForm.value;
    const jobInfoData = this.infojobForm.value;
    const jobListData = this.joblistingForm.value;

    let requestObj = {}
    requestObj['platform'] = jobPlatformData.platform;
    requestObj['job_category'] = jobInfoData.job_category;
    requestObj['title_of_job'] = jobInfoData.title_of_job;
    requestObj['job_description'] = jobInfoData.job_description;
    requestObj['job_image'] = jobListData.job_image;
    requestObj['advt_description'] = jobListData.advt_description;
    requestObj['URL_link'] = jobListData.URL_link;
    requestObj['budget_advt'] = jobListData.budget_advt;
    requestObj['duration_advt'] = jobListData.duration_advt;
    requestObj['delivery_advt'] = jobListData.delivery_advt;

    return this.authttp.post('create_a_job', requestObj).subscribe(
      res=>{
        this.loader.stop();
        console.log(res);
        console.log(requestObj);
        if(res.success == true){
          this.isClassOneActive[this.selectedTab] = true;
          this.toastr.success(res.message);
        }
        else{
          this.toastr.error(res.message);
        }
      },
      err =>{
        this.toastr.error('Something went wrong. Please try again.');
        this.loader.stop();
    });
  }

  signOut() {
    localStorage.removeItem('token');
    this.headerService.updateHeader('loginheader');
    this.router.navigate(['/login']);
  }
}
