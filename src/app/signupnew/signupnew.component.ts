import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
declare  var $;
@Component({
  selector: 'app-signupnew',
  templateUrl: './signupnew.component.html',
  styleUrls: ['./signupnew.component.css'],
    providers: [Commonservices],
})
export class SignupnewComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    static invalidemail;
    static blankemail;
    static invalidpassword;
    public is_error;
    public state: any = [];
    public serverurl;
    public errorterms=false;
    public passmatchvalidate;
    public marketingbudgetval;
    public reqval;
    public msgnoval;

    constructor(fb: FormBuilder,private _http: HttpClient,private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        SignupnewComponent.blankemail = false;
        SignupnewComponent.invalidemail = false;
        this.is_error='';
        this.serverurl = _commonservices.url;
        let link = this.serverurl + 'getusastates';
        this._http.get(link)
            .subscribe(res => {
                var result1 = res;
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
            country: ["", Validators.required],
            companywebsite: ["", Validators.required],
            marketingbudget: ["", Validators.required],
            request: [""],
            city: ["", Validators.required],
            app: ["", Validators.required],
            message: [""],
            terms: [""],
            messageno: [""],
            password: ['', Validators.compose([Validators.required, SignupnewComponent.validatePassword])],
            confirmpassword: ["", Validators.required],
            email: ['', Validators.compose([Validators.required, SignupnewComponent.validateEmail])]
        },{validator: this.matchingPasswords('password', 'confirmpassword')});
    }


    static validateEmail(control: FormControl) {
        SignupnewComponent.blankemail = false;
        SignupnewComponent.invalidemail = false;

        if (control.value == '') {
            SignupnewComponent.blankemail = true;
            return { 'invalidemail' : true } ;
        }
        if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            SignupnewComponent.invalidemail = true;
            return { 'invalidemail': true };
        }
    }

    getemail(type: any)  {
        if (type == 'invalid') {
            return SignupnewComponent.invalidemail;
        }
        if (type == 'blank') {
            return SignupnewComponent.blankemail;
        }
    }
    getpassword(type: any) {
        if (type == 'invalid') {
            return SignupnewComponent.invalidpassword;
        }
    }
    static validatePassword(control: FormControl) {
        SignupnewComponent.invalidpassword = false;
        if (control.value == '' || control.value == null) {
            return {'invalidpassword': false};
        }
        if (!control.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
            //  if (!control.value.match(/^[a-zA-Z0-9_]+$/)) {
            SignupnewComponent.invalidpassword = true;
            return {'invalidpassword': true};
        }
    }
    public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): {[key: string]: any} => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
            if (password.value == confirmPassword.value) {
                this.passmatchvalidate = true;
            }
        };
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
        this.errorterms = false;
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        if(formval.terms==true){
            this.errorterms = false;
        }
        else {
            this.errorterms = true;
        }
        if (this.dataForm.valid && this.passmatchvalidate  && (SignupnewComponent.invalidemail == false || SignupnewComponent.blankemail == false) && formval.terms == true) {
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
            };
            let link = this.serverurl + 'signupnew';
            console.log(data);
            this._http.post(link, data)
                .subscribe(res => {
                    let result: any;
                     result = res;
                    console.log(result.status);
                    if (result.status == 'success') {
                        this.router.navigate(['/']);
                    }
                    else {
                        this.is_error = result.id;
                    }
                   // this.errorterms = false;
                }, error => {
                    console.log("Oooops!");
                });
        }
    }
}
