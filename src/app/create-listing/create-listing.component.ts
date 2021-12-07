import { HeaderService, HttpIntercepter } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss']
})
export class CreateListingComponent implements OnInit {

  platform: any = '';
  category: any = '';
  tags: any = '';
  filePath1: string;
  filePath2: string;
  filePath3: string;
  filePath4: string;

  imageUpload: string[] = [];
  profile_page: any = '';
  top_location: any = '';
  gender: any = '';
  age_range: any = '';
  delevery_time: any = '';
  post_engagement: any = '';
  page_followrs: any = '';
  majority_audience_gender: any = '';
  majority_audience_age: any = '';
  majority_audience_location: any = '';
  post_reach: any = '';
  story_reach: any = '';
  media_upload: any = '';
  total_likes: any = '';
  page_likes: any = '';
  page_views: any = '';
  
  userData : any;
  createData : any;
  selectedTab = 0;
  isClassOneActive: boolean[] = [];

  platformForm: FormGroup;
  promotionForm: FormGroup;
  categoryForm: FormGroup;
  tagsForm: FormGroup;
  insightForm: FormGroup;
  deliveryTimeForm: FormGroup;
  advertiseForm: FormGroup;
  accountForm: FormGroup;
  
  public loginid:any="";

  constructor(
    private loader:LoaderService,
    private authttp: HttpIntercepter,
    private toastr: ToastrService,
    private headerService: HeaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.authttp.get('my_listing').subscribe(
    //   res=>{
    //     // console.log(res);
    //   this.createData = res;
    //   console.log(this.createData);
    // });
  

  this.platformForm = new FormGroup({
    platform: new FormControl()
  })

  this.promotionForm = new FormGroup({
    select_duration: new FormControl(),
    enter_a_price: new FormControl()
  })
  
  this.categoryForm = new FormGroup({
    category: new FormControl()
  })

  this.tagsForm = new FormGroup({
    tags: new FormControl()
  })

  this.insightForm = new FormGroup({
    profile_page: new FormControl(),
    top_location: new FormControl(),
    gender: new FormControl(),
    age_range: new FormControl()
  })


  this.deliveryTimeForm = new FormGroup({
    delevery_time: new FormControl(),
  })

  this.accountForm = new FormGroup({
    post_engagement: new FormControl(),
    page_followrs: new FormControl(),
    majority_audience_gender: new FormControl(),
    majority_audience_age: new FormControl(),
    majority_audience_location: new FormControl(),
    post_reach: new FormControl(),
    story_reach: new FormControl(),
    media_upload: new FormControl(),
    total_likes: new FormControl(),
    page_likes: new FormControl(),
    page_views: new FormControl(),
  })

  this.advertiseForm = new FormGroup({
    delivery_advt: new FormControl()
  })


  if(!(localStorage.getItem('token')) || (localStorage.getItem('token')) == null || (localStorage.getItem('token')) == 'undefined'){
    this.loginid="";
    }else{
    this.loginid = localStorage.getItem('token');
  }
}

  onSubmitPlatform() {
    console.log(this.platformForm.value);
  }

  time(){
    console.log(this.deliveryTimeForm.value);
  }

  onSubmitContact() {
    console.log(this.categoryForm.value);
  }

  Next(){
    console.log(this. accountForm.value);
  }

  onSubmitTags() {
    console.log(this.tagsForm.value);
  }

  // advert() {
  //   console.log(this.advertiseForm.value);
  // }

  next(){
    this.selectedTab +=1;
  }

  onSub(){
    console.log(this.deliveryTimeForm.value);
  }


  doPlatform() {
    const formValue1 = this.platformForm.value;
    // let requestObj = {};
    // requestObj['platform'] = formValue1.platform;
  }

  doPromotion() {
    const formValue2 = this.promotionForm.value;
    // let requestObj = {};
    // requestObj['select_duration'] = formValue2.select_duration;
    // requestObj['enter_a_price'] = formValue2.enter_a_price;
  }

  doCategory() {
    const formValue3 = this.categoryForm.value;
    // let requestObj = {};
    // requestObj['category'] = formValue3.category;
  }

  doTags() {
    const formValue4 = this.tagsForm.value;
    // let requestObj = {};
    // requestObj['tags'] = formValue4.tags;
  }

  doInsight() {
    const formValue5 = this.insightForm.value;
    // let requestObj = {};
    // requestObj['profile_page'] = formValue5.profile_page;
    // requestObj['top_location'] = formValue5.top_location;
    // requestObj['gender'] = formValue5.gender;
    // requestObj['age_range'] = formValue5.age_range;
  }


  imagePreview1(e: any) {
    // this.loader.start();
    const file = e.target.files[0];
    this.insightForm.patchValue({
      img: file
    });
    
    this.insightForm.get('img')?.updateValueAndValidity()
    
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath1 = reader.result as string;
      console.log(this.filePath1);
      this.imageUpload = this.filePath1.split(',');
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
  imagePreview2(e: any) {
    // this.loader.start();
    const file = e.target.files[0];
    this.insightForm.patchValue({
      img: file
    });
    
    this.insightForm.get('img')?.updateValueAndValidity()
    
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath2 = reader.result as string;
      console.log(this.filePath2);
      this.imageUpload = this.filePath2.split(',');
      console.log(this.imageUpload);
    }
    reader?.readAsDataURL(file)
  }
  imagePreview3(e: any) {
    // this.loader.start();
    const file = e.target.files[0];
    this.insightForm.patchValue({
      img: file
    });
    
    this.insightForm.get('img')?.updateValueAndValidity()
    
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath3 = reader.result as string;
      console.log(this.filePath3);
      this.imageUpload = this.filePath3.split(',');
      console.log(this.imageUpload);
    }
    reader?.readAsDataURL(file)
  }
  imagePreview4(e: any) {
    // this.loader.start();
    const file = e.target.files[0];
    this.insightForm.patchValue({
      img: file
    });
    
    this.insightForm.get('img')?.updateValueAndValidity()
    
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath4 = reader.result as string;
      console.log(this.filePath4);
      this.imageUpload = this.filePath4.split(',');
      console.log(this.imageUpload);
    }
    reader?.readAsDataURL(file)
  }



  doDeliveryTime() {
    const formValue6 = this.deliveryTimeForm.value;
    // let requestObj = {};
    // requestObj['delevery_time'] = formValue6.delevery_time;
  }

  doAccount() {
    const formValue7 = this.accountForm.value;
    // let requestObj = {};
    // requestObj['post_engagement'] = formValue7.post_engagement;
    // requestObj['page_followrs'] = formValue7.page_followrs;
    // requestObj['majority_audience_gender'] = formValue7.majority_audience_gender;
    // requestObj['majority_audience_age'] = formValue7.majority_audience_age;
    // requestObj['majority_audience_location'] = formValue7.majority_audience_location;
    // requestObj['post_reach'] = formValue7.post_reach;
    // requestObj['story_reach'] = formValue7.story_reach;
    // requestObj['media_upload'] = formValue7.media_upload;
    // requestObj['total_likes'] = formValue7.total_likes;
    // requestObj['page_likes'] = formValue7.page_likes;
    // requestObj['page_views'] = formValue7.page_views;
  }
  
  delivery_agr() {
    this.selectedTab +=1;
  }

  createList() {
    // this.loader.start();
    // let getCreateList = new FormData();
    // getCreateList.append('platform', this.platform);
    // getCreateList.append('category', this.category);
    // getCreateList.append('tags', this.tags);
    // getCreateList.append('profile_page', this.profile_page);
    // getCreateList.append('gender', this.gender);
    // getCreateList.append('age_range', this.age_range);
    // getCreateList.append('delevery_time', this.delevery_time);
    // getCreateList.append('post_engagement', this.post_engagement);
    // getCreateList.append('page_followrs', this.page_followrs);
    // getCreateList.append('majority_audience_gender', this.majority_audience_gender);
    // getCreateList.append('majority_audience_age', this.majority_audience_age);
    // getCreateList.append('majority_audience_location', this.majority_audience_location);
    // getCreateList.append('post_reach', this.post_reach);
    // getCreateList.append('story_reach', this.story_reach);
    // getCreateList.append('media_upload', this.media_upload);
    // getCreateList.append('total_likes', this.total_likes);
    // getCreateList.append('page_likes', this.page_likes);
    // getCreateList.append('page_views', this.page_views);
    // getCreateList.append('top_location', this.top_location);

    const platformData = this.platformForm.value;
    const promotionData = this.promotionForm.value;
    const categoryData = this.categoryForm.value;
    const tagsData = this.tagsForm.value;
    const insightData = this.insightForm.value;
    const deliveryTimeData = this.deliveryTimeForm.value;
    const accountData = this.accountForm.value;
    const advertiseData = this.advertiseForm.value;

    let requestObj = {};
    requestObj['platform'] = platformData.platform;
    requestObj['select_duration'] = promotionData.select_duration;
    requestObj['enter_a_price'] = promotionData.enter_a_price;
    requestObj['category'] = categoryData.category;
    requestObj['tags'] = tagsData.tags;
    requestObj['profile_page'] = insightData.profile_page;
    requestObj['top_location'] = insightData.top_location;
    requestObj['gender'] = insightData.gender;
    requestObj['age_range'] = insightData.age_range;
    requestObj['delevery_time'] = deliveryTimeData.delevery_time;
    requestObj['post_engagement'] = accountData.post_engagement;
    requestObj['page_followrs'] = accountData.page_followrs;
    requestObj['majority_audience_gender'] = accountData.majority_audience_gender;
    requestObj['majority_audience_age'] = accountData.majority_audience_age;
    requestObj['majority_audience_location'] = accountData.majority_audience_location;
    requestObj['post_reach'] = accountData.post_reach;
    requestObj['story_reach'] = accountData.story_reach;
    requestObj['media_upload'] = accountData.media_upload;
    requestObj['total_likes'] = accountData.total_likes;
    requestObj['page_likes'] = accountData.page_likes;
    requestObj['page_views'] = accountData.page_views;
    requestObj['delivery_advt'] = advertiseData.delivery_advt;
    
    return this.authttp.post('create_listing', requestObj).subscribe(
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
