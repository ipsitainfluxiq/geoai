import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css'],
  providers: [Commonservices],
})
export class NewpasswordComponent implements OnInit {
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
    console.log('get mail from accesscode page saved cookie ->  ' + this.mailcookiedetails);
    if (typeof (this.mailcookiedetails) == 'undefined') {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {
    this.isSubmit = false;
    this.passmatchvalidate = false;
    this.dataForm = this.fb.group({
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
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    this.is_error = 0;
    this.passmatchvalidate = false;
    if (this.dataForm.controls['password'].value == this.dataForm.controls['confpassword'].value) {
      this.passmatchvalidate = true;
    }
    this.isSubmit = true;
    if (this.dataForm.valid && this.passmatchvalidate) {
      let link = this.serverurl + 'newpassword';
    //   let link = 'http://localhost:3004/newpassword';
      let data = {email: this.mailcookiedetails, password: formval.password, confirmpassword: formval.confpassword};

      this._http.post(link, data)
          .subscribe(res => {
            let result: any;
             result = res;
            if (result.status == 'success') {
              // this.coockieData.removeAll();
              this.router.navigate(['/accountdetails']);
            }
            else {
              this.is_error = result.msg;
            }
          }, error => {
            console.log('Oooops!');
          });
    }


  }
}
