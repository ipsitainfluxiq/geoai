import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
  providers: [Commonservices],
})
export class ChangepasswordComponent implements OnInit {
  public dataForm: FormGroup ;
  public fb;
  public isSubmit;
  id: number;
  public serverurl;
  public emailcookie: CookieService;
  public mailcookiedetails;
  public passmatchvalidate;
  public is_error: any;

  constructor( emailcookie: CookieService, fb: FormBuilder, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
    this.emailcookie = emailcookie ;
    this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
    console.log('mailcookiedetails');
    console.log('get mail from login page saved cookie ->  ' + this.mailcookiedetails);
  }

  ngOnInit() {
    this.isSubmit = false;
    this.passmatchvalidate = false;
    this.dataForm = this.fb.group({
      oldpassword: ["", Validators.required],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      confpassword: ["", Validators.required],
    }, {validator: this.matchingPasswords('password', 'confpassword') });
    };

  public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        console.log('mismatch');
        return {
          mismatchedPasswords: true
        };
      } else {
        this.passmatchvalidate = true;
      }
    };
  }

  dosubmit(formval) {
    this.is_error = 0;
    this.passmatchvalidate = true;
    this.isSubmit = true;
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    if (this.dataForm.valid && this.passmatchvalidate) {

      var link = this.serverurl + 'changepassword';
      // var link= 'http://influxiq.com:3001/changepassword';
      var data = {email: this.mailcookiedetails, oldpassword: formval.oldpassword, password: formval.password, confirmpassword: formval.confpassword};

      this._http.post(link, data)
          .subscribe(res => {
            let result: any;
             result = res;
            if (result.status == 'success') {
              this.router.navigate(['/accountdetails']);
            } else {
              this.is_error = result.msg;
            }
          }, error => {
            console.log("Oooops!");
          });
    }


  }
  }


