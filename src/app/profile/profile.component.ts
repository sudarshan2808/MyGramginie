import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ElementRef  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClientService,HttpIntercepter, HeaderService, LoaderService,CommonService, ManualAuthService } from '../app.service'; 
import { DataService } from '../services/data.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  index: number;
  filePath: string;
  imgUpload: FormGroup;
  phoneCode: string;
  phone: string = '';
  zip: string = '';
  street: string = '';
  apt: string = '';
  country: string = '';
  city: string = '';
  postal_code: string = '';
  selectedTab = 0;
  otptext:string = "";
  otpForm: boolean =false;
  userData : any;
  address: string = '';
  description: any = '';
  photo: any = '';
  followers: any = '';
  following: any = '';
  insta_followers: any = '';
  insta_following: any = '';
  insta_username: any = '';
  name: any = '';
  chat: any = '';
  past_work_contracts: any = '';
  profile_status: any = '';
  rate: any = ''; 
  locationForm: FormGroup;
  phoneForm: FormGroup;
  profileForm: FormGroup;
  number: any = '';
  username: string = '';
  imageUpload: string[];
  image:any = '';
  myTag: any = '';
  isClassOneActive: boolean[] = [];
  
  language: any = '';
  lang_type: any = '';
  status: any = '';
  completion: any = '';

  constructor(
    private fb: FormBuilder, 
    private authttp: HttpIntercepter, 
    private dataService: DataService,
    private loader:LoaderService,  
    private toastr: ToastrService, 
    private router:Router,
    private el: ElementRef
    ) { 
  }

  ngOnInit(): void {

      this.imgUpload = new FormGroup({
        image: new FormControl(),
        img: new FormControl()
      });

      this.phoneForm = new FormGroup({
        phoneCode: new FormControl('',{validators:[Validators.required]}),
        phone: new FormControl('', {validators:[Validators.required, Validators.pattern("[0-9 ]{12}")]})
      });

      this.locationForm = new FormGroup({
        country: new FormControl('',{validators:[Validators.required]}),
        street: new FormControl('',{validators:[Validators.required]}),
        apt: new FormControl('',{validators:[Validators.required]}),
        city: new FormControl('',{validators:[Validators.required]}),
        postal_code: new FormControl('',{validators:[Validators.required]})
      })
  }

  back() {
    this.selectedTab -= 1;
  }

  next(){
    this.selectedTab +=1;
  }

  change(){
    this.otpForm = !this.otpForm;
  }

  imageSubmit(){
    console.log(this.imgUpload)
  }

  phoneSubmit(){
    console.log(this.phoneForm);
  }

  locationSubmit(){
    console.log(this.locationForm)
  }
  

  imagePreview(e: Event): void {
    // this.loader.start();
    // const file = e.target.files[0];
    const file = (e.target as HTMLInputElement).files[0];
    this.imgUpload.patchValue({
      img: file
    });
    this.imgUpload.get('img')?.updateValueAndValidity() 
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
      // this.filePath = event.target.result;
      console.log(this.filePath);
      this.imageUpload = this.filePath.split(',');
      console.log(this.imageUpload);
    }
    reader?.readAsDataURL(file)
  }

  onOtpChange(e){ 
    this.otptext = e;
  }


  instaData(){
    this.loader.start();
    let getInstaData = new FormData();
    getInstaData.append('first_name', this.userData?.first_name);
    getInstaData.append('last_name', this.userData?.last_name);
    getInstaData.append('city', this.userData?.city);
    getInstaData.append('country',this.userData?.country);
    
    return this.authttp.post('edit_profile', getInstaData).subscribe(
      res=>{
        this.loader.stop();
        console.log(res);
        console.log(getInstaData);
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
  
  profileData() {
    
    const phoneData = this.phoneForm.value;
    const locationData = this.locationForm.value;
    const imgData = this.imgUpload.value;
    // const formValue3 = this.profileForm.value;

    this.loader.start();
    let formData = new FormData();
    formData.append('image', imgData.img);
    formData.append('phone', phoneData.phone);
    formData.append('country', locationData.country);
    formData.append('street', locationData.street);
    formData.append('apt', locationData.apt);
    formData.append('city', locationData.city);
    formData.append('postal_code', locationData.postal_code);
    // formData.append('language', imgData.img);
    // formData.append('lang_type', imgData.img);


    // let requestObj = {};
    // requestObj['image'] = imgData.img;
    // requestObj['phone'] = phoneData.phone;
    // requestObj['country'] = locationData.country;
    // requestObj['street'] = locationData.street;
    // requestObj['apt'] = locationData.apt;
    // requestObj['city'] = locationData.city;
    // requestObj['postal_code'] = locationData.postal_code;
    // requestObj['language'] = 'language_ui';
    // requestObj['lang_type'] = 'lang_type_ui';
    
    return this.authttp.post('profile_setup', formData).subscribe(
      res=>{
        this.loader.stop();
        console.log(res);
        console.log(formData);
        if(res.status == true){
          this.isClassOneActive[this.selectedTab] = true;
          localStorage.getItem('token');
          this.toastr.success('Profile setup successfully!');
          this.router.navigate(['/home']);
        }
        else{
          // this.toastr.error(res.message);
          this.toastr.error('Please complete your profile!');
        }
      },
      err =>{
        this.toastr.error('Something went wrong. Please try again.');
        this.loader.stop();
      });
  }
}
