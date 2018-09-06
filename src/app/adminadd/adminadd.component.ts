import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-adminadd',
  templateUrl: './adminadd.component.html',
  styleUrls: ['./adminadd.component.css'],
    providers: [Commonservices],
})
export class AdminaddComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public passmatchvalidate;
    public serverurl;
    static invalidemail;
    static blankemail;
   /* public emailcookie: CookieService;
    public mailcookiedetails;*/

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: HttpClient, private router: Router, private _commonservices: Commonservices, emailcookie: CookieService) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        AdminaddComponent.blankemail = false;
        AdminaddComponent.invalidemail = false;
    /*    this.emailcookie = emailcookie ;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        console.log('get mail from login page saved cookie ->  ' + this.mailcookiedetails);
        if (typeof (this.mailcookiedetails) != 'undefined') {
            this.router.navigateByUrl('/accountdetails');
        }*/
    }

    ngOnInit() {
        this.passmatchvalidate = false;
        this.dataForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, AdminaddComponent.validateEmail])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            confpassword: ['', Validators.required],
          /*  address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            phone: ['', Validators.required],*/
        }, {validator: this.matchingPasswords('password', 'confpassword') });
    }


    static validateEmail(control: FormControl) {
        AdminaddComponent.blankemail = false;
        AdminaddComponent.invalidemail = false;

        if (control.value == '') {
            AdminaddComponent.blankemail = true;
            return { 'invalidemail' : true } ;
        }
        if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            AdminaddComponent.invalidemail = true;
            return { 'invalidemail': true };
        }
    }

    getemail(type: any)  {
        // console.log('t '+type);
        if (type == 'invalid') {
            return AdminaddComponent.invalidemail;
        }
        if (type == 'blank') {
            return AdminaddComponent.blankemail;
        }
    }

    public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): {[key: string]: any} => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                console.log('mismatch');
                return {
                    mismatchedPasswords: true
                };
            }
            else {
                this.passmatchvalidate = true;
            }
        };
    }


    dosubmit(formval) {
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        console.log('inside submit');
        if (this.dataForm.valid && this.passmatchvalidate && (AdminaddComponent.invalidemail == false || AdminaddComponent.blankemail == false)) {
            let link = this.serverurl + 'addadmin';
            let data = {
                firstname: formval.firstname,
                lastname: formval.lastname,
                email: formval.email,
                password: formval.password,
              /*  address: formval.address,
                city: formval.city,
                state: formval.state,
                zip: formval.zip,
                phone: formval.phone,*/
            };
            this._http.post(link, data)
                .subscribe(res => {
                    this.router.navigate(['/adminlist']);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }


}