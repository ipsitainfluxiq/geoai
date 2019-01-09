import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [Commonservices],
})
export class LoginComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public is_error;
    public serverurl;
    public alldetailcookie: CookieService;
    public cookiedetailsforalldetails;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public id;

    constructor(fb: FormBuilder, emailcookie: CookieService, alldetailcookie: CookieService, private _http: HttpClient, private router: Router,  private _commonservices: Commonservices, private route: ActivatedRoute) {
        this.serverurl = _commonservices.url;
        this.fb = fb;
        this.emailcookie = emailcookie ;
        this.alldetailcookie = alldetailcookie ;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        this.cookiedetailsforalldetails = this.alldetailcookie.get('cookiedetailsforalldetails');
        console.log(this.mailcookiedetails);
        if (this.mailcookiedetails != '') {
                this.router.navigateByUrl('/campaignlists');
        }
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required]});
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log('id is: '+this.id);
        });
    }

    dosubmit(formval) {
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        this.is_error = 0;
        if (this.dataForm.valid) {
           // var link = 'http://localhost:3004/login';
            let link = this.serverurl + 'login';
          //  let link = 'http://166.62.39.137:3000/login';
            let data = {email: formval.email, password: formval.password};

            this._http.post(link, data)
                .subscribe(res => {
                    let result: any;
                     result = res;
                    console.log('result.status-----');
                    console.log(result.status);
                    if (result.status == 'success') {
                       // this.emailcookie.putObject('mailcookiedetails', result.msg.email);
                        this.emailcookie.set('mailcookiedetails', result.msg.email);
                        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
                        console.log('after putobject mail' + this.mailcookiedetails);
                      //  this.alldetailcookie.putObject('cookiedetailsforalldetails', result.msg);
                        this.alldetailcookie.set('cookiedetailsforalldetails', result.msg._id);
                        this.alldetailcookie.set('fname', result.msg.firstname);
                        this.alldetailcookie.set('lname',result.msg.lastname);
                        this.alldetailcookie.set('email',result.msg.email);
                        this.alldetailcookie.set('type',result.msg.type);
                        this.cookiedetailsforalldetails = this.alldetailcookie.get('mailcookiedetails');
                        console.log('after putobject all details' + this.cookiedetailsforalldetails);
                        console.log(this.alldetailcookie.get('fname'));
                        console.log(this.alldetailcookie.get('type'));
                        console.log('this.id'+this.id);
                        if(this.id==null){
                            console.log('campaignlllllll');
                            this.router.navigate(['/campaignlists']);
                        }else{
                            console.log('edittttttcampaignlllllll');
                            this.router.navigate(['/editcampaign',this.id,1]);
                        }
                       // window.location.reload();
                    }
                    else {
                        console.log('else part');
                        this.is_error = result.msg;
                      //  this.router.navigate(['/']);
                    }

                }, error => {
                    console.log('Oooops!');
                });
        }
    }
}
