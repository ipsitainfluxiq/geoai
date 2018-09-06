import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-userinformation',
  templateUrl: './userinformation.component.html',
  styleUrls: ['./userinformation.component.css'],
    providers: [Commonservices],
})
export class UserinformationComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public serverurl;
    public passerror;
    public alldetailcookie: CookieService;
    public cookiedetailsforalldetails;
    public cookiedetailsforalldetails_type;
    public emailcookie: CookieService;
    public mailcookiedetails;

    constructor(fb: FormBuilder, emailcookie: CookieService, alldetailcookie: CookieService, private _http: HttpClient, private router: Router,  private _commonservices: Commonservices) {
        this.serverurl = _commonservices.url;
        this.fb = fb;
        this.emailcookie = emailcookie ;
        this.alldetailcookie = alldetailcookie ;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        this.cookiedetailsforalldetails = this.alldetailcookie.get('cookiedetailsforalldetails');
        this.cookiedetailsforalldetails_type = this.alldetailcookie.get('type');
       console.log(this.mailcookiedetails);
       console.log(this.cookiedetailsforalldetails);
       console.log(this.cookiedetailsforalldetails_type);
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: [''],
            companyname: ['', Validators.required],
            country: ['', Validators.required],
            companywebsite: ['', Validators.required],
            city: ['', Validators.required],
            marketingbudget: ['', Validators.required],
            password: [''],
            confpassword: [''],
        });
        setTimeout(() => {
        this.getdetails();
        }, 300);
    }
    getdetails() {
        let link = this.serverurl + 'userdetailsnew';
       // let data = {_id : this.cookiedetailsforalldetails._id};
        let data = {_id : this.cookiedetailsforalldetails};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                console.log(result);
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    let userdet = result.item;
                    this.dataForm = this.fb.group({
                        firstname: [userdet.firstname, Validators.required],
                        lastname: [userdet.lastname, Validators.required],
                        email: [userdet.email],
                        companyname: [userdet.companyname, Validators.required],
                        country: [userdet.country, Validators.required],
                        companywebsite: [userdet.companywebsite, Validators.required],
                        city: [userdet.city, Validators.required],
                        marketingbudget: [userdet.marketingbudget, Validators.required],
                        password: [''],
                        confpassword: [''],
                    });
                }else {
                 //   this.router.navigate(['/adminlist']);
                }
            }, error => {
                console.log('Ooops');
            });
    }
    callcancel(){
        this.router.navigate(['/campaignlists']);
    }
    dosubmit(formval) {
        this.passerror = null;
        let x: any;
        if(this.cookiedetailsforalldetails_type==0){ //user
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        }
        if (formval.password == null || formval.password == '') {
            if (this.dataForm.valid) {
                let link = this.serverurl + 'usserinfoedit';
                let data = {
                    id : this.cookiedetailsforalldetails,
                    firstname: formval.firstname,
                    lastname: formval.lastname,
                    companyname: formval.companyname,
                    country: formval.country,
                    companywebsite: formval.companywebsite,
                    city: formval.city,
                    marketingbudget: formval.marketingbudget
                };
                this._http.post(link, data)
                    .subscribe(res => {
                        let result: any;
                         result = res;
                        console.log(result);
                        this.router.navigate(['/campaignlists']);
                    }, error => {
                        console.log('Oooops!');
                    });
            }
        }
        else {
            this.passerror = null;
            if (formval.password == formval.confpassword) {
                if (formval.password.length >= 8) {
                    console.log('2 step ahd');
                    if (!formval.password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
                        this.passerror = 'Password must contain at least 8 characters,one lower case character , one upper case character , one number, one special character';
                    }
                    else {
                        this.passerror = null;
                         if (this.dataForm.valid) {
                        let link= this.serverurl + 'usserinfoedit';
                        let data = {
                            id : this.cookiedetailsforalldetails,
                            firstname: formval.firstname,
                            lastname: formval.lastname,
                            password: formval.password,
                            companyname: formval.companyname,
                            country: formval.country,
                            companywebsite: formval.companywebsite,
                            city: formval.city,
                            marketingbudget: formval.marketingbudget
                        };
                        this._http.post(link, data)
                            .subscribe(data => {
                                this.router.navigate(['/campaignlists']);
                            }, error => {
                                console.log('Oooops!');
                            });
                           }
                    }
                }
                else {
                    this.passerror = 'Password must contain at least 8 characters';
                }
            }
            else {
                this.passerror = 'Passwords must match';
            }
        }
    }
}
