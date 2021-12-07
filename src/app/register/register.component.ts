import { Component, OnInit,Compiler} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import * as _ from 'underscore';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl,
         ValidatorFn, ValidationErrors, FormControlName, NgForm  } from '@angular/forms';
import { HttpClientService,HttpIntercepter, HeaderService, LoaderService,CommonService,
         ManualAuthService,NotificationService, AppService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Rx';
import {ViewChild, ElementRef} from '@angular/core';
import { HttpClient  } from '@angular/common/http';  
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MustMatch } from '../_helpers/must-match.validator';
import { User } from '../user';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
declare let $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup;
  otpForm: FormGroup;
  emailalert:string = "";
  emailtext:string = "";
  otptext:string = "";
  userid:string = "";
  passwordalert:string = "";
  cpasswordalert:string = "";
  typealert:string = "";
  otpLay: boolean = false;
  timeLeft: number = 60; 
  interval;
  isresendButton:boolean = false;
  checked : boolean = false;
  type: string;
  userType: string;
  selectedTab : number;
  uType: string;
    
  form: FormGroup;
  users: any;
  userId: any;

  // rForm: any = {};
  // isSuccessful = false;
  // isSignUpFailed = false;
  // errorMessage = '';

  constructor(
    private authService: AuthService,
    private http1:HttpClient,
    private router:Router,  
    private http: HttpClientService, 
    private authttp: HttpIntercepter, 
    private headerService: HeaderService, 
    private loader:LoaderService, 
    private activatedRoute: ActivatedRoute, 
    private commons:CommonService, 
    private toastr: ToastrService, 
    private fb: FormBuilder,
    private route : ActivatedRoute,
    private auth: ManualAuthService,
    private _compiler: Compiler,
    private appService: AppService,
    private apiService: ApiService,
    private notification:NotificationService) 
    {
      this.registerForm = fb.group({
        'fname' : ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z]+$')]],
        'lname' : ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z]+$')]],
        'email' : ["", [Validators.required, Validators.email]],
        'password' : ["", [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]],
        'cpassword' : ["", [Validators.required, Validators.minLength(8)]],
        'username' : [''],
        'country' : ['', [Validators.required]],
        'check' : [false, [Validators.requiredTrue]],
      },{
        validator: MustMatch('password', 'cpassword')
    }); 
      this.notification.getHeaderText('register');
      this.notification.getHeaderType('loginheader');



      // this.apiService.users().subscribe((data) => {
      //   this.users = data;
      // })
   }



  ngOnInit(): void { 
    window.scrollTo(0, 0)
    this.headerService.userType$.subscribe(
      type => {
    });  
    this.route.queryParams
    .subscribe(params => { 
      this.userType = params['type'];
     if(this.userType == 'Business owner'){
      this.selectedTab = 0;
    }
    else{
      this.selectedTab = 1;
    }
    });

    // this.addUser(postData);
  }

  // validate(values){ 
  //   console.log(values);
  //   if(!(values.email.match(this.emailPattern))) { 
  //     return false;
  //   }else if(values.password == "") { 
  //     this.emailalert = "";
  //     return false;
  //   }else if(values.cpassword != values.password) { 
  //     this.passwordalert = "";
  //     return false;
  //   }else if(values.regType == "") { 
  //     this.cpasswordalert = "";
  //     return false;
  //   }else{
  //     alert('hi');
  //     this.typealert = "";
  //     this.doregister(values);
  //   }
  // }

  // okay(){
  //     this.toastr.error('Hello world!', 'Toastr fun!');
  // }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('index => ', tabChangeEvent.index);
    if(tabChangeEvent.index == 0){
      this.userType = "Business owner";
    }
    else{
      this.userType = "Influencer"
    }
  }

  onChkChange(ob: MatCheckboxChange) {
    console.log("checked: " + ob.checked);
    this.checked = ob.checked;
 } 


 beforeSubmit(data, form: FormGroup) {
  return new Promise((resolve) => {
    Object.keys(data).forEach((x) => {
      if (typeof x === 'string' && !_.isEmpty(form.get(x).value)) {
        form.get(x).setValue(form.get(x).value.trim());
      }
      resolve(form.value);
    });
  });
}

  register() {
    // this.loader.start();
    // let formData = new FormData();
    // formData.append('firstname', this.registerForm.get('fname').value);
    // formData.append('lastname',this.registerForm.get('lname').value); 
    // formData.append('password',this.registerForm.get('password').value);
    // formData.append('email',this.registerForm.get('email').value);
    // formData.append('country', this.registerForm.get('country').value); 
    // formData.append('username', this.registerForm.get('username').value); 
    // formData.append('type', this.userType);

    // this.beforeSubmit(formdata, this.form).then((data: any) => {
    // console.log(data, this.form.valid);

    const formValue = this.registerForm.value;
    let requestObj = {};
    requestObj['first_name'] = formValue.fname;
    requestObj['last_name'] = formValue.lname;
    requestObj['password'] = formValue.password;
    requestObj['email'] = formValue.email;
    requestObj['country'] = formValue.country;
    requestObj['username'] = formValue.value;
    requestObj['type'] = this.userType;

    if(this.checked == false){
      this.toastr.error('Please accept terms and condition.');
    }
    return this.authttp.post('userregister', formValue).subscribe(
      res=>{
        console.log(res);
        console.log(formValue);
        this.loader.stop();
        if(res.status == 200) {
          if(res.data != null) {
              this.toastr.success(res.message);
              console.log(this.registerForm.value);
              sessionStorage.setItem('values',JSON.stringify(this.registerForm.value));
              this.router.navigate(['/email_verification'], { queryParams: { type: this.userType }} );
          } else {
              this.toastr.error("Please check your email to complete your account registration.");
              this.toastr.error(res.message);
           } 
        }
        else {
          this.toastr.error(res.message);
        }
        this.headerService.publishData(this.registerForm.get('email').value);
      },
      err => {
        this.toastr.error('Something went wrong. Please try again.');
        this.loader.stop();
    });

  }

  getUserFormData(form: NgForm) {
    console.log(form);

    // console.log(this.registerForm.value);
    const registerData = this.registerForm.value;
    this.authttp.post('http://52.91.17.221:8800/', registerData).subscribe(response => {
      console.log(response);
    });
  }



  // submit(formdata) {
    
  //   this.beforeSubmit(formdata, this.form).then((data: any) => {
  //     console.log(data, this.form.valid);
  //     if (this.form.valid) {
  //       let requestData = {...data};
  //       requestData.type = 'Consumer';
  //       requestData.image = this.profileImage;
  //       // API CALL HERE
  //       this.api.post('signup', requestData).subscribe((res: any) => {
  //         if (res.status) {
  //           this.storge.setUser(data);
  //           this.event.setLoginEmmit(true);
  //           this.api.alert('You have successfully registered', 'success');
  //           this.storge.clearTempData();
  //         } else {
  //           this.api.alert(res.message, 'error');
  //         }
  //       }, err => {
  //         this.api.alert('User registration fail! Please Try again!', 'error');
  //       });

  //     } else {
  //       this.form.markAllAsTouched();
  //     }
  //   });
  // }

  // addCustomer(formValue: NgForm) {
  //   console.log(formValue.value);

  //   const postBody = {
  //     first_name: formValue.value.first_name,
  //     last_name: formValue.value.last_name,
  //     email: formValue.value.email,
  //     password: formValue.value.password,
  //     type: formValue.value.type
  //  };
    
  //   this.appService.addUser(postBody).subscribe(data => {
  //     console.log(data);
  //   }, (err) => {
  //     console.log("Unable to add user" + err);
  //   })
  // }

  // addUser() {
  //   this.apiService.addUser(this.user).subscribe(data => {
  //       console.log(data);
  //       // this.refreshPeople();
  //     }, (err) => {
  //       console.log("Unable to add user" + err);
  //     })      
  // }

  // doregister(values){
  //   this.loader.start();
  //   let formData = new FormData();
  //   formData.append('email', this.email.value); 
  //   formData.append('password', this.password.value); 
  //   formData.append('type',this.country.value); 
  //   return this.authttp.post('userRegister',formData).subscribe(
  //     res => {
  //       console.log(res);
  //     this.loader.stop();
  //     if(res.status == 200){
  //       this.toastr.success(res.message);
  //       this.userid = res.user_id;
  //       this.emailtext = values?.email;
  //       this.otpLay = true;
  //       this.isresendButton = true;
	// 			this.timeLeft = 60;
	// 			this.interval = setInterval(() => {
	// 		      if(this.timeLeft > 0) {
	// 		        this.timeLeft--;
	// 		      } else {
	// 		        this.isresendButton = false;
	// 		      }
	// 		    },1000)
  //     }
  //     else{
  //       this.toastr.error(res.message);
  //     } 
      
  //   },
  //   err => {
  //     this.toastr.error('Something went wrong. Please try again.');
  //     this.loader.stop();
  //   });
  // }

  // onOtpChange(e){ 
  //   this.otptext = e;
  // }

  // otpdone(){    
  //   this.loader.start();
  //   let formData = new FormData();
  //   formData.append('user_id', this.userid); 
  //   formData.append('otp', this.otptext); 
  //   console.log(this.userid, this.otptext);
    
  //   return this.authttp.post('verifyOtp',formData).subscribe(
  //     res => {
  //     this.loader.stop();
  //     if(res.status == 200){
  //       this.toastr.success(res.message); 
  //       this.registerForm.reset();
  //       this.otpLay = false;        
  //       this.router.navigate(['/login']); 
  //     }
  //     else{
  //       this.toastr.error(res.message);
  //     } 
      
  //   },
  //   err => {
  //     this.toastr.error('Something went wrong. Please try again.');
  //     this.loader.stop();
  //   });
  // }
  //  resend(){
  //   this.loader.start();
  //   let formData = new FormData();
  //   this.timeLeft = 60;
  //   formData.append('email', this.emailtext); 
  //   return this.authttp.post('resendotp',formData).subscribe(
  //     res => {
  //     this.loader.stop();

  //     if(res.status == 200){
  //       this.toastr.success(res.message);
  //       this.userid = res.status;
  //       this.isresendButton = true;
	// 			this.timeLeft = 60;
	// 			this.interval = setInterval(() => {
	// 		      if(this.timeLeft > 0) {
	// 		        this.timeLeft--;
	// 		      } else {
	// 		        this.isresendButton = false;
	// 		      }
	// 		    },1000)
  //     }
  //     else{
  //       this.toastr.error(res.message);
  //     } 
      
  //   },
  //   err => {
  //     this.toastr.error('Something went wrong. Please try again.');
  //     this.loader.stop();
  //   });
  // }

  // addUser(postData: { firstName: string; lastName: string; email: any; password: any; type: string}) {

  //   this.apiService.saveUser('userregister', postData).subscribe(user => {
  //     console.log(user);
  //     this.userId = user.id;
  //   });
  // }

  // onSubmit() {
  //   this.authService.register(this.form).subscribe(
  //     data => {
  //       console.log(data);
  //       this.isSuccessful = true;
  //       this.isSignUpFailed = false;
  //     },
  //     err => {
  //       this.errorMessage = err.error.message;
  //       this.isSignUpFailed = true;
  //     }
  //   );
  // }

}

