import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [Commonservices],
})
export class SignupComponent implements OnInit {
  public dataForm: FormGroup;
  public fb;
  static invalidemail;
  static blankemail;
  public passmatchvalidate;
  public agency_name_not_req;
  public is_error;
  public agencyval;
  public state: any = [];
  public months: any = [];
  public serverurl;
  public agencydiv;

  constructor(fb: FormBuilder,private _http: HttpClient,private router: Router, private _commonservices: Commonservices) {
    this.fb = fb;
    this.months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    SignupComponent.blankemail = false;
    SignupComponent.invalidemail = false;
    this.is_error='';
    this.serverurl = _commonservices.url;
    this.agencydiv = false;
    // var link = 'http://localhost:3004/getusastates';
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
    this.passmatchvalidate = false;

    this.dataForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      companyname: ["", Validators.required],
      email: ['', Validators.compose([Validators.required, SignupComponent.validateEmail])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmpassword: ["", Validators.required],
      agency_name: [""],
    //  agency_name: ['', Validators.compose([Validators.required, SignupComponent.validateagency])],
    //  month: [""],
    //  day: [""],
    //  year: [""],
      phone: [""],
     // location: [""],
     // state: [""],
          agencyval: [""],
          about_us: [""],
        },
       {validator: this.matchingPasswords('password', 'confirmpassword','agencyval', 'agency_name')},
       /* {validator: this.validateagency('agencyval', 'agency_name')}*/);
  }


  static validateEmail(control: FormControl) {
    SignupComponent.blankemail = false;
    SignupComponent.invalidemail = false;

    if (control.value == '') {
      SignupComponent.blankemail = true;
      return { 'invalidemail' : true } ;
    }
    if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      SignupComponent.invalidemail = true;
      return { 'invalidemail': true };
    }
  }



  getemail(type: any)  {
    // console.log('t '+type);
    if (type == 'invalid') {
      return SignupComponent.invalidemail;
    }
    if (type == 'blank') {
      return SignupComponent.blankemail;
    }
  }

  opendiv() {
    this.agencydiv = (1 - this.agencydiv);
  }
  public matchingPasswords(passwordKey: string, confirmPasswordKey: string, agencyvalue: string, agencyname: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      let agency_value = group.controls[agencyvalue];
      let agency_name = group.controls[agencyname];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
      if (password.value == confirmPassword.value) {
        this.passmatchvalidate = true;
      }
      if (agency_value.value == true && (agency_name.value == '' || typeof(agency_name)=='undefined')) {
        return {
          agency_name_req: true
        };
      }
      if (agency_value.value == false) {
        this.agency_name_not_req = true;
      }
    };
  }

/*  public validateagency(agencyvalue: string, agencyname: string) {
    return (group: FormGroup): {[key: string]: any} => {
     // console.log('group  ');
      let agency_value = group.controls[agencyvalue];
      let agency_name = group.controls[agencyname];
    //  console.log('agency_value.value  '+agency_value.value+'   agency_name.value '+agency_name.value);
      if (agency_value.value == true && (agency_name.value == '' || typeof(agency_name)=='undefined')) {
      //  console.log('name req');
        return {
          agency_name_req: true
        };
      }
      else {
        this.agency_name_not_req = true;
      }
    };
  }*/


  dosubmit(formval) {
   /* console.log('this.dataForm.valid '+this.dataForm.valid);
    console.log('this.passmatchvalidate '+this.passmatchvalidate);
    console.log('SignupComponent.invalidemail '+SignupComponent.invalidemail);
    console.log('SignupComponent.blankemail '+SignupComponent.blankemail);
    console.log('this.agency_name_not_req '+this.agency_name_not_req);*/


    if (formval.agencyval == '' || typeof(formval.agencyval) == 'undefined') {
      formval.agencyval = false;
    }
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }

    if (this.dataForm.valid && this.passmatchvalidate && (SignupComponent.invalidemail == false || SignupComponent.blankemail == false) && this.agency_name_not_req) {
      console.log('hi');
      var data = {
        firstname: formval.firstname,
        lastname: formval.lastname,
        companyname: formval.companyname,
        email: formval.email,
        password: formval.password,
        agencyval: formval.agencyval,
        agency_name: formval.agency_name,
       // month: formval.month,
       // day: formval.day,
       // year: formval.year,
        phone: formval.phone,
        about_us: formval.about_us,
       // location: formval.location,
       // state: formval.state,
      };

     // var link = 'http://localhost:3004/signup';
      let link = this.serverurl + 'signup';
      this._http.post(link, data)
          .subscribe(res => {
            let result: any;
             result = res;
            console.log(result.status);
            if (result.status == 'success') {
              // $('#popthankyou').modal('show');
              this.router.navigate(['/']);
            }
            else {
              this.is_error = result.status;
              // console.log(this.is_error);
            }
          }, error => {
            console.log("Oooops!");
          });


    }
  }
}
