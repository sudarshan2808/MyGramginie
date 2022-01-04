import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpIntercepter, LoaderService } from '../app.service';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changeForm: FormGroup;
  isChecked: boolean = false;
  submitted:boolean=false;
  otpLay: boolean = false;

  // old_password = new FormControl(localStorage.getItem('old_password'), Validators.required);
  // new_password = new FormControl(localStorage.getItem('new_password'), Validators.required);

  constructor(
    private formbuilder: FormBuilder,
    private authttp: HttpIntercepter,
    private loader:LoaderService,
    private router:Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.changeForm = this.formbuilder.group({
      old_password:['',Validators.required],
      new_password:['',Validators.required],
      confirm_password:['',Validators.required]
    }, {
      validator: MustMatch('new_password', 'confirm_password')
    });
  }


  doChange() {
    // event.preventDefault();
    this.loader.start();

    // this.submitted=true;
    // if(this.changeForm.invalid){
    //   return;
    // }

    const formValue = this.changeForm.value;
    let requestObj = {};
    requestObj['old_password'] = formValue.old_password;
    requestObj['new_password'] = formValue.new_password;

    // if(this.isChecked == true){
    //   localStorage.setItem('old_password', this.old_password.value);
    //   localStorage.setItem('new_password', this.new_password.value);
    // } else {
    //   localStorage.removeItem('old_password');
    //   localStorage.removeItem('new_password');
    // }

    return this.authttp.post('changepassword', formValue).subscribe(
      res => {
      console.log(res);
      console.log(formValue);
      this.loader.stop();
      if(res.status == 200 || res.success == true) {
        // this.toastr.success(res.message);
        // this.userid = res.data['id'];
        // this.emailtext = values?.email;
        // this.otpLay = true;
        // this.isresendButton = true;
				// this.timeLeft = 60;
				// this.interval = setInterval(() => {
			  //   if(this.timeLeft > 0) {
			  //     this.timeLeft--;
		    //   } else {
		    //     this.isresendButton = false;
		    //   }
			  // }, 1000)

        // localStorage.setItem('token',res.token);
        this.toastr.success('Password has been changed!');
        // this.router.navigate(['/login']);
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
