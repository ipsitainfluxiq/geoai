import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-accountdetails',
    templateUrl: './accountdetails.component.html',
    styleUrls: ['./accountdetails.component.css'],
    providers: [Commonservices],
})
export class AccountdetailsComponent implements OnInit {
    public serverurl;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public userdetails;

    constructor( emailcookie: CookieService, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
       // console.log('mailcookiedetails');
       // console.log('get mail from login page saved cookie ->  ' + this.mailcookiedetails);
        if (this.mailcookiedetails != null || this.mailcookiedetails != '' || typeof (this.mailcookiedetails) != 'undefined') {
            this.getdetails();
        }
    }

    ngOnInit() {
    }

    getdetails() {
        let link = this.serverurl + 'accountdetails';
        let data = {emailid : this.mailcookiedetails};
        console.log(data);
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    this.userdetails = result.item;
                    console.log(this.userdetails);
                }else {
                    this.router.navigate(['/adminlist']);
                }
            }, error => {
                console.log('Ooops');
            });
    }
}
