import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css'],
  providers: [Commonservices],
})
export class UpdateprofileComponent implements OnInit {
  public dataForm: FormGroup ;
  public fb;
  public isSubmit;
  id: number;
  public serverurl;
  public emailcookie: CookieService;
  public mailcookiedetails;
  public state: any = [];
  public months: any = [];

  constructor( emailcookie: CookieService, fb: FormBuilder, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
    this.months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    this.fb = fb;
    this.serverurl = _commonservices.url;
    this.emailcookie = emailcookie ;
    this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
    console.log('mailcookiedetails');
    console.log('get mail from login page saved cookie ->  ' + this.mailcookiedetails);
    let link = this.serverurl + 'getusastates';
    this._http.get(link)
        .subscribe(res => {
          let result1: any;
           result1 = res;
          for (let i in result1) {
            this.state[i]= result1[i].name;
          }
        }, error => {
          console.log("Oooops!");
        });
  }

  ngOnInit() {

    this.isSubmit = false;

    this.dataForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [''],
      month: [''],
      day: [''],
      year: [''],
      location: [''],
      state: [''],
      phone: [''],

    });
    this.getdetails();
  }
  getdetails() {
    let link = this.serverurl + 'accountdetails';
    let data = {emailid : this.mailcookiedetails};
    this._http.post(link, data)
        .subscribe(res => {
          let result: any;
           result = res;
          if (result.status == 'success' && typeof(result.item) != 'undefined') {
            let userdet = result.item;
            console.log('ki hchcheeeeeeee');
            console.log(userdet.state);
            console.log(userdet.year);
            (<FormControl>this.dataForm.controls['firstname']).setValue(userdet.firstname);
            (<FormControl>this.dataForm.controls['lastname']).setValue(userdet.lastname);
            (<FormControl>this.dataForm.controls['email']).setValue(userdet.email);
              (<FormControl>this.dataForm.controls['phone']).setValue(userdet.phone);
              (<FormControl>this.dataForm.controls['month']).setValue(userdet.month);
            (<FormControl>this.dataForm.controls['day']).setValue(userdet.day);
            (<FormControl>this.dataForm.controls['year']).setValue(userdet.year);
            (<FormControl>this.dataForm.controls['location']).setValue(userdet.location);
            (<FormControl>this.dataForm.controls['state']).setValue(userdet.state);
          }else {
            this.router.navigate(['/accountdetails']);
          }
        }, error => {
          console.log('Ooops');
        });
  }

  dosubmit(formval) {
    this.isSubmit = true;
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    console.log(this.dataForm.valid);
  //  if (this.dataForm.valid) {
      let link= this.serverurl + 'updateprofile';
      let data = { firstname: formval.firstname, lastname: formval.lastname, email: formval.email, phone: formval.phone, month: formval.month, day: formval.day, year: formval.year, location: formval.location, state: formval.state};
      console.log(data);
      this._http.post(link, data)
          .subscribe(data => {
            this.router.navigate(['/accountdetails']);
          }, error => {
            console.log('Oooops!');
          });
 //   }
  }

}
