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
  isChecked: boolean = false;

  email = new FormControl(localStorage.getItem('email') , [ Validators.required, Validators.email ]);
  password = new FormControl(localStorage.getItem('password'), Validators.required);
  emailPattern  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

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
    //   this.registerForm = fb.group({
    //     'fname' : ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z]+$')]],
    //     'lname' : ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z]+$')]],
    //     'email' : ["", [Validators.required, Validators.email]],
    //     'password' : ["", [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]],
    //     'cpassword' : ["", [Validators.required, Validators.minLength(8)]],
    //     'username' : [''],
    //     'country' : ['', [Validators.required]],
    //     'check' : [false, [Validators.requiredTrue]],
    //   },{
    //     validator: MustMatch('password', 'cpassword')
    // }); 
    //   this.notification.getHeaderText('register');
    //   this.notification.getHeaderType('loginheader');

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

    this.formInit();
  }

  formInit() {
    this.registerForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z]+$')]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z]+$')]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]),
      cpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      username: new FormControl(''),
      country: new FormControl('', [Validators.required]),
      check: new FormControl('', [Validators.requiredTrue])
    },
    // {
    //   validator: MustMatch('password', 'cpassword')
    // }
  );
  }

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



  register(event: Event) {

    event.preventDefault();

    const formValue = this.registerForm.value;
    let requestObj = {};
    requestObj['first_name'] = formValue.first_name;
    requestObj['last_name'] = formValue.last_name;
    requestObj['password'] = formValue.password;
    requestObj['email'] = formValue.email;
    requestObj['country'] = formValue.country;
    requestObj['username'] = formValue.username;
    requestObj['type'] = this.userType;

    if(this.checked == false){
      this.toastr.error('Please accept terms and condition.');
    }

    if(this.isChecked == true){
      localStorage.setItem('email', this.email.value);
      localStorage.setItem('password', this.password.value);
      // this.cookieService.set('email', this.email.value);
      // this.cookieService.set('password', this.password.value);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      // this.cookieService.delete('email');
      // this.cookieService.delete('password');
    }
      // OBSERVER
      return this.authttp.post('userregister', formValue).subscribe(
      res=>{
          
          this.authttp.post('email_verification', formValue).subscribe(
            response => {
              console.log(response);
              console.log(formValue);   
            } 
          )

        console.log(res);
        console.log(formValue);
        this.loader.stop();
        if(res.status == 200) {
          if(res.data != null) {
              this.toastr.success(res.message);
              console.log(this.registerForm.value);

              // this.headerService.setLoginEmmit(true);
              sessionStorage.setItem('values',JSON.stringify(this.registerForm.value));
              // localStorage.setItem('token',res.token);
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

  // getUserFormData(form: NgForm) {
  //   console.log(form);

  //   // console.log(this.registerForm.value);
  //   const registerData = this.registerForm.value;
  //   this.authttp.post('http://52.91.17.221:8800/', registerData).subscribe(response => {
  //     console.log(response);
  //   });
  // }

}

