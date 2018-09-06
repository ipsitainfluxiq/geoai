import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-helpdeskadd',
  templateUrl: './helpdeskadd.component.html',
  styleUrls: ['./helpdeskadd.component.css'],
    providers: [Commonservices],
})
export class HelpdeskaddComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public passmatchvalidate;
    public serverurl;
    static invalidemail;
    static blankemail;
    static invalidpassword;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: HttpClient, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        HelpdeskaddComponent.blankemail = false;
        HelpdeskaddComponent.invalidemail = false;
    }

    ngOnInit() {
        this.passmatchvalidate = false;
        this.dataForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, HelpdeskaddComponent.validateEmail])],
          //  password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            password: ['', Validators.compose([Validators.required, HelpdeskaddComponent.validatePassword])],
            confpassword: ['', Validators.required],
        }, {validator: this.matchingPasswords('password', 'confpassword') });
    }


    static validateEmail(control: FormControl) {
        HelpdeskaddComponent.blankemail = false;
        HelpdeskaddComponent.invalidemail = false;

        if (control.value == '') {
            HelpdeskaddComponent.blankemail = true;
            return { 'invalidemail' : true } ;
        }
        if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            HelpdeskaddComponent.invalidemail = true;
            return { 'invalidemail': true };
        }
    }

    getemail(type: any)  {
        // console.log('t '+type);
        if (type == 'invalid') {
            return HelpdeskaddComponent.invalidemail;
        }
        if (type == 'blank') {
            return HelpdeskaddComponent.blankemail;
        }
    }
    static validatePassword(control: FormControl) {
        HelpdeskaddComponent.invalidpassword = false;
        if (control.value == '' || control.value == null) {
            return {'invalidpassword': false};
        }
        if (!control.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
            //  if (!control.value.match(/^[a-zA-Z0-9_]+$/)) {
            HelpdeskaddComponent.invalidpassword = true;
            return {'invalidpassword': true};
        }
    }
    public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                //  console.log('mismatch');
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
            return HelpdeskaddComponent.invalidpassword;
        }
    }

    dosubmit(formval) {
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        console.log('inside submit');
        if (this.dataForm.valid && this.passmatchvalidate && (HelpdeskaddComponent.invalidemail == false || HelpdeskaddComponent.blankemail == false) && HelpdeskaddComponent.invalidpassword == false) {
            let link = this.serverurl + 'addhelpdisk';
            let data = {
                firstname: formval.firstname,
                lastname: formval.lastname,
                email: formval.email,
                password: formval.password,
            };
            this._http.post(link, data)
                .subscribe(res => {
                    this.router.navigate(['/helpdesklist']);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
cancelit(){
    this.router.navigate(['/helpdesklist']);
}

}