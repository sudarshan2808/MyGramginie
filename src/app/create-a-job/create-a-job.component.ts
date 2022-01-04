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

  platform: any = '';
  job_category: any = '';
  title_of_job: any = '';
  job_description: any = '';
  job_image: any = '';
  advt_description: any = '';
  URL_link: any = '';
  budget_advt: any = '';
  duration_advt: any = '';
  delivery_advt: any = '';

  filePath: string;
  platformForm: FormGroup;
  infojobForm: FormGroup;
  joblistingForm: FormGroup;
  imageUpload: string[];
  userData : any;

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
      img: new FormControl()
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


  imagePreview(e: Event): void {
    // this.loader.start();
    const file = (e.target as HTMLInputElement).files[0];
    console.log(file)
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
    }
    reader?.readAsDataURL(file)
  }


  createJob() {
    
    const jobPlatformData = this.platformForm.value;
    const jobInfoData = this.infojobForm.value;
    const jobListData = this.joblistingForm.value;

    this.loader.start();
    let formData = new FormData();
    formData.append('platform', jobPlatformData.platform);
    formData.append('job_category', jobInfoData.job_category);
    formData.append('title_of_job', jobInfoData.title_of_job);
    formData.append('job_description', jobInfoData.job_description);
    formData.append('job_image', jobListData.img);
    formData.append('advt_description', jobListData.advt_description);
    formData.append('URL_link', jobListData.URL_link);
    formData.append('budget_advt', jobListData.budget_advt);
    formData.append('duration_advt', jobListData.duration_advt);
    formData.append('delivery_advt', jobListData.delivery_advt);


    // let requestObj = {}
    // requestObj['platform'] = jobPlatformData.platform;
    // requestObj['job_category'] = jobInfoData.job_category;
    // requestObj['title_of_job'] = jobInfoData.title_of_job;
    // requestObj['job_description'] = jobInfoData.job_description;
    // requestObj['job_image'] = jobListData.img;
    // requestObj['advt_description'] = jobListData.advt_description;
    // requestObj['URL_link'] = jobListData.URL_link;
    // requestObj['budget_advt'] = jobListData.budget_advt;
    // requestObj['duration_advt'] = jobListData.duration_advt;
    // requestObj['delivery_advt'] = jobListData.delivery_advt;

    return this.authttp.post('create_a_job', formData).subscribe(
      res=> {
        this.loader.stop();
        console.log(res);
        console.log(formData);
        if(res.success == false) {
          this.isClassOneActive[this.selectedTab] = true;
          this.toastr.error('Please complete your job list');
        }
        else {
          this.toastr.success('Job created successfully!');
        }
      },
      err => {
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
