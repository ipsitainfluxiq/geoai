import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.css'],
  providers: [Commonservices],
})
export class UseraddComponent implements OnInit {
  public dataForm: FormGroup;
  public fb;
  public passmatchvalidate;
  public serverurl;
  public agencylist;
  public agencyerror=null;
  static invalidemail;
  static blankemail;
  static invalidpassword;
  public cookiedetailsforalldetails_type;
  public alldetailcookie: CookieService;
  public marketingbudgetval;
  public reqval;
  public msgnoval;
  public helpdesklist;
  public helpdeskerr;

  constructor(fb: FormBuilder, addcookie: CookieService, private _http: HttpClient, private router: Router, private _commonservices: Commonservices,  alldetailcookie: CookieService) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
    UseraddComponent.blankemail = false;
    UseraddComponent.invalidemail = false;
    this.alldetailcookie = alldetailcookie ;
    this.cookiedetailsforalldetails_type = this.alldetailcookie.get('type');
    console.log(this.alldetailcookie.get('cookiedetailsforalldetails'));
  }

  ngOnInit() {
    this.passmatchvalidate = false;
    this.dataForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, UseraddComponent.validateEmail])],
      password: ['', Validators.compose([Validators.required, UseraddComponent.validatePassword])],
      confpassword: ['', Validators.required],
      companyname: ["", Validators.required],
      country: ["", Validators.required],
      companywebsite: ["", Validators.required],
      marketingbudget: ["", Validators.required],
      request: [""],
      city: ["", Validators.required],
      app: ["", Validators.required],
      message: [""],
      messageno: [""],
      helpdeskid: [""],
    }, {validator: this.matchingPasswords('password', 'confpassword') });

    this.gethelpdesklist();
  }
  gethelpdesklist(){
    let link = this.serverurl + 'getagencyhelpdesklist';
    let data= {
      type : 'helpdesk'
    }
    this._http.post(link,data)
        .subscribe(res => {
          let result: any;
          result = res;
          if(result.status=='success' && result.items!=null){
            this.helpdesklist = result.items;
          }
          console.log(this.helpdesklist);
        }, error => {
          console.log('Oooops!');
        });
  }

  static validateEmail(control: FormControl) {
    UseraddComponent.blankemail = false;
    UseraddComponent.invalidemail = false;

    if (control.value == '') {
      UseraddComponent.blankemail = true;
      return { 'invalidemail' : true } ;
    }
    if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      UseraddComponent.invalidemail = true;
      return { 'invalidemail': true };
    }
  }

  getemail(type: any)  {
    if (type == 'invalid') {
      return UseraddComponent.invalidemail;
    }
    if (type == 'blank') {
      return UseraddComponent.blankemail;
    }
  }
  static validatePassword(control: FormControl) {
    UseraddComponent.invalidpassword = false;
    if (control.value == '' || control.value == null) {
      return {'invalidpassword': false};
    }
    if (!control.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
      UseraddComponent.invalidpassword = true;
      return {'invalidpassword': true};
    }
  }
  public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
      else {
        this.passmatchvalidate = true;
      }
    };
  }

  getpassword(type: any) {
    if (type == 'invalid') {
      return UseraddComponent.invalidpassword;
    }
  }
  addval(value){
    this.marketingbudgetval= value; // uses only for ngClass in html
    this.dataForm.patchValue({marketingbudget: value});
  }
  addreqval(value){
    this.reqval= value; // uses only for ngClass in html
    this.dataForm.patchValue({request: value});
  }
  messagenoval(value){
    this.msgnoval= value; // uses only for ngClass in html
    this.dataForm.patchValue({messageno: value});
  }
  dosubmit(formval) {
    this.helpdeskerr = null;
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    if (this.dataForm.valid && this.passmatchvalidate && (UseraddComponent.invalidemail == false || UseraddComponent.blankemail == false) && UseraddComponent.invalidpassword == false) {
      if(formval.helpdeskid !=""){
      let link = this.serverurl + 'signupnew';
      var data = {
        firstname: formval.firstname,
        lastname: formval.lastname,
        password: formval.password,
        companyname: formval.companyname,
        email: formval.email,
        country: formval.country,
        companywebsite: formval.companywebsite,
        city: formval.city,
        app: formval.app,
        marketingbudget: formval.marketingbudget,
        message: formval.message,
        request: formval.request,
        messageno: formval.messageno,
        page: 'useradd',
        agencyid:this.alldetailcookie.get('cookiedetailsforalldetails'),
        helpdeskid:formval.helpdeskid
      };
          this._http.post(link, data)
              .subscribe(res => {
                this.router.navigate(['/userlist']);
              }, error => {
                console.log('Oooops!');
              });
    }
    else{
        this.helpdeskerr = 'Select an employee for this user';
      }
    }
  }

  cancelit(){
    this.router.navigate(['/userlist']);
  }

}