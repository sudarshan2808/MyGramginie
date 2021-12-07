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
    private el: ElementRef
    ) { 
    // this.imgUpload = this.fb.group({
    //   img: [null],
    //   filename: ['']
    // })
    // this.locationForm = this.fb.group({})
    // this.phoneForm = this.fb.group({})
  }

  ngOnInit(): void {

      this.imgUpload = new FormGroup({
        image: new FormControl('',{validators:[Validators.required]})
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

  // imgUpload = new FormGroup({
  //   image: new FormControl()
  // });

  // phoneForm = new FormGroup({
  //   phone: new FormControl()
  // });

  // locationForm = new FormGroup({
  //   country: new FormControl(),
  //   street: new FormControl(),
  //   apt: new FormControl(),
  //   city: new FormControl(),
  //   code: new FormControl(),
  // })

  imageSubmit(){
    console.log(this.imgUpload)
  }

  phoneSubmit(){
    console.log(this.phoneForm);
  }

  locationSubmit(){
    console.log(this.locationForm)
  }

  // profileSubmit() {
  //   console.log(this.profileForm);
  // }


  imagePreview(e: any) {
    // this.loader.start();
    const file = e.target.files[0];
    this.imgUpload.patchValue({
      img: file
    });
    
    this.imgUpload.get('img')?.updateValueAndValidity()
    
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

  // addPhone(){
  //   // this.loader.start();
  //   // let getPhone = new FormData();
  //   // getPhone.append('phone', this.phone);

  //   const formValue1 = this.phoneForm.value;
  //   let requestObj = {};
  //   requestObj['phoneCode'] = formValue1.phoneCode;
  //   requestObj['phone'] = formValue1.phone;
    
  //   return this.authttp.post('profile_setup', formValue1).subscribe(
  //     res=>{
  //       this.loader.stop();
  //       console.log(res);
  //       console.log(formValue1);
        
  //       if(res.success == true){
  //         this.otpForm = !this.otpForm;  
  //         this.toastr.success(res.message);      
  //       }   
  //     },
  //     err => {
  //       this.toastr.error('Something went wrong. Please try again.');
  //       this.loader.stop();
  //     });
  // }

  // addLocation(){
  //   // this.loader.start();
  //   // let getLocation = new FormData();
  //   // getLocation.append('street', this.userData?.street );
  //   // getLocation.append('country', this.userData?.country);
  //   // getLocation.append('apt', this.userData?.apt);
  //   // getLocation.append('city', this.userData?.city);
  //   // getLocation.append('postal_code', this.userData?.postal_code);

  //   const formValue2 = this.locationForm.value;
  //   let requestObj = {};
  //   requestObj['street'] = formValue2.street;
  //   requestObj['country'] = formValue2.country;
  //   requestObj['apt'] = formValue2.apt;
  //   requestObj['city'] = formValue2.city;
  //   requestObj['postal_code'] = formValue2.postal_code;


  //   return this.authttp.post('profile_setup', formValue2).subscribe(
  //     res=>{
  //       console.log(res);
  //       console.log(formValue2);
  //       this.loader.stop();

  //       if(res.success == true){
  //         this.isClassOneActive[3] = true;
  //         this.toastr.success(res.message);
  //       }
  //     },
  //     err =>{
  //       this.toastr.error('Something went wrong. Please try again.');
  //       this.loader.stop();
  //   });
  // }

  onOtpChange(e){ 
    this.otptext = e;
  }

  // verifyOtp(){
  //   this.loader.start();
  //   let getData = new FormData();
  //   getData.append('phone', this.phone);
  //   getData.append('code', this.otptext);
  //   return this.authttp.post('verifyCode', getData).subscribe(
  //     res=>{
  //       this.loader.stop();
  //       if(res.success == true){
  //         this.isClassOneActive[this.selectedTab] = true;
  //         this.selectedTab += 1;
  //         this.toastr.success(res.message);
  //       }
  //       else{
  //         this.toastr.error(res.message);
  //       }
  //     }, 
  //     err =>{
  //       this.toastr.error('Something went wrong. Please try again.');
  //       this.loader.stop();
  //     });
  // }

  // resend() {
  //   this.loader.start();
  //   let getReData = new FormData();
  //   getReData.append('phone', this.phone);
  //   return this.authttp.post('profile_setup', getReData).subscribe(
  //     res=>{
  //       this.loader.stop();
  //       if(res.success == true){
  //         this.toastr.success(res.message);
  //       }
  //       else{
  //         this.toastr.error(res.message);
  //       }
  //     },
  //     err =>{
  //       this.toastr.error('Something went wrong. Please try again.');
  //       this.loader.stop();
  //     });
  // }

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
  // currentdate = new Date();
  // onemonth= new Date();
  // qtr= new Date();
  // half= new Date();
  // full= new Date();
  // onOptionsSelected(value: any){
  //   this.currentdate = new Date(value);
  //   console.log(this.currentdate);
  //   this.onemonth =new Date(value);
  //   this.qtr= new Date(value);
  //   this.half= new Date(value);
  //   this.full= new Date(value);
  //   this.onemonth = new Date(this.onemonth.setDate(this.currentdate.getDate() + 30))
  //   this.qtr = new Date(this.qtr.setDate(this.currentdate.getDate() + 120))
  //   this.half = new Date(this.half.setDate(this.currentdate.getDate() + 180))
  //   this.full = new Date(this.full.setDate(this.currentdate.getDate() + 365))
  // }
  

  profileData() {
    
    const phoneData = this.phoneForm.value;
    const locationData = this.locationForm.value;
    const imgData = this.imgUpload.value;
    // const formValue3 = this.profileForm.value;
    let requestObj = {};
    requestObj['image'] = this.imageUpload[1];
    requestObj['country'] = locationData.country;
    requestObj['apt'] = locationData.apt;
    requestObj['city'] = locationData.city;
    requestObj['postal_code'] = locationData.postal_code;
    requestObj['language'] = 'language_ui';
    requestObj['lang_type'] = 'lang_type_ui';
    requestObj['street'] = locationData.street;
    requestObj['status'] = 'true';
    requestObj['phone'] = phoneData.phone;
    

    return this.authttp.post('profile_setup', requestObj).subscribe(
      res=>{
        // this.loader.stop();
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
}
