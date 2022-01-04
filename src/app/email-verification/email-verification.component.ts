import { StorageService } from './../services/storage.service';
import { Component, OnInit ,Compiler} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {Router,ActivatedRoute} from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HeaderService,HttpIntercepter,LoaderService,NotificationService } from '../app.service';  
import {Globals} from '../global';
declare let $: any;

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  email: string;
  type: string;
  values: any;
  userType: string;
  resendForm: FormGroup;
  emailForm: FormGroup;
  destroyer: Subject<boolean> = new Subject();

  isChecked: boolean = false;
  emailisverify: any;

  userId: string;
  token: string;
  private subscription: Subscription ;

  constructor(
    private router:Router,
    private headerService: HeaderService, 
    private activatedRoute: ActivatedRoute,
    private authttp: HttpIntercepter,
    public notdata:Globals,
    private fb: FormBuilder,
    private loader:LoaderService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private notification:NotificationService,
    private storage: StorageService) {

      this.notification.getHeaderText('emailverify');
      this.notification.getHeaderType('login');

      this.resendForm = this.fb.group({
        'email' : ["", [Validators.required, Validators.email]],
      })
    }

  ngOnInit(): void {  
    window.scrollTo(0, 0)
    this.headerService.userType$.subscribe(
      email => {
        this.email = email;
    }); 
    // console.log(this.email)
    this.route.queryParamMap
      .subscribe(params => { 
        this.type = params.get('type');
        console.log('Query params ',this.type) 
    });
    this.values = JSON.parse(sessionStorage.getItem('values'));
    console.log(this.values);


    
    this.route.queryParams.subscribe(queryParams => {
      const token = queryParams['token'];
      // Call your Backend API with the token after this
    });

  }

  change(){
    this.loader.start();
    let formData = new FormData();
    formData.append('firstname', this.values['fname']); 
    formData.append('lastname',this.values['lname']); 
    formData.append('password',this.values['password']);
    formData.append('email',this.resendForm.get('email').value);
    formData.append('country', this.values['country']); 
    formData.append('username', this.values['username']); 
    formData.append('type', this.values['type']);
    return this.authttp.post('influencer_signup', formData).subscribe(
      res=>{
        console.log(res);
        this.loader.stop();
        if(res.success == true){
          this.toastr.success(res.message);
          $("#resendModal").modal("hide");
          this.values['email']= this.resendForm.get('email').value;
          sessionStorage.setItem('values',  JSON.stringify(this.values));
          console.log(sessionStorage.getItem('values'));
          
        }
        else{
          this.toastr.error(res.message);
        }
      },
      err => {
        this.toastr.error('Something went wrong. Please try again.');
        this.loader.stop();
      });
  }

  resend(){
    this.loader.start();
    let formData = new FormData();
    formData.append('email', this.values['email']); 
    return this.authttp.post('email_verification',formData).subscribe(
      res => {
      this.loader.stop();
      console.log(res);
      if(res.success == true){
        this.toastr.success(res.message);
      }
      else{
        this.toastr.error(res.message);
      } 
      
    },
    err => {
      this.toastr.error('Something went wrong. Please try again.');
      this.loader.stop();
    });

  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('index => ', tabChangeEvent.index);
    if(tabChangeEvent.index == 0){
      this.type = "Business owner";
    }
    else{
      this.type = "Influencer"
    }
  }

  continue_verify() {

    this.loader.start();
    let formData = { email: this.values['email'] };
    // formData.append('email', this.values['email']); 

    if(this.isChecked == true){
      localStorage.setItem('email', this.resendForm.value);
    } else {
      localStorage.removeItem('email');
    } 

     this.authttp.post('token_generate',formData).subscribe(
      res => {
        console.log(res);
        this.loader.stop();
        if(res.status == 200 || res.verify == true) {
          if(this.type == 'Influencer') {
          localStorage.setItem('token',res.token);
          localStorage.getItem('token');
          this.toastr.success('Influencer verified successfully!');
          this.router.navigate(['/profile'], { queryParams: { type: this.type }});
        } else {
          // this.toastr.error(res.message);
          this.toastr.success('Business Owner verified successfully!');
        } 
      } else {
        this.toastr.error(res.message);
      }
    },
      err => {
        this.toastr.error('Something went wrong. Please try again.');
        this.loader.stop();
      });
  }

  
}
